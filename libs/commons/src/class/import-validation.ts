import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { isEmpty } from 'class-validator';
import { DateTime } from 'luxon';
import * as moment from 'moment'; 

import {ImportValidationEnum} from './import-validation.enum'

@Injectable()
export class ImportValidation {
  public field;
  public fieldValue;

  public headerRules; //header list

  public importRow;
  public headerImport;

  private readonly logger = new Logger(ImportValidation.name);

  public async rules(): Promise<any> {
    let validations: Array<string> = [];
    this.headerRules.forEach((element) => {
      if (element.value === this.field) {
        validations = element['validation'].split('|');
      }
    });
    return validations;
  }

  
    /**
   * @param rows
   * this method use to validate all the rows of the import EXCEL/CSV
   * @return ArrError array()
   */
    public async validateRows(rows: Array<string>, uploadHeaderRules: any[]) {
      let rowCount = 2; //start of the rows in the CSV/EXCEL
      const arrError: any[] = []; //this will be the storage of all error msges
      const headerRow = rows[0]; //header of excel
  
      this.headerRules = uploadHeaderRules;
  
      for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];
  
        const rowIsNull = await this.checkRowIfNull(row);
        if (rowIsNull) {
          break;
        }
  
        let fieldErrors: any;
  
        for (let colIndex = 0; colIndex < headerRow.length; colIndex++) {
          const colHeader = headerRow[colIndex];
  
          const headerFieldResult = await this.getUploadField(
            colHeader,
            uploadHeaderRules,
          );
  
          if (headerFieldResult.isFound) {
            const headerField = headerFieldResult.headerField;
  
          
  
            fieldErrors = await this.validate(
              colHeader,
              row[colIndex],
            );
  
            if (fieldErrors) {
              arrError.push({
                row: rowCount,
                field: colHeader,
                errors: fieldErrors,
              });
            }
          }
        }
  
        rowCount++;
      }
  
      return arrError;
    }
  
  /**
   * @param fieldName
   * @param fieldValue , fieldName
   * this method use to validate the data in every rules
   */
    private async validate(fieldName, fieldValue): Promise<any> {
      this.field = fieldName;
      this.fieldValue = fieldValue; //value/data in uploaded excel
      const rules: Array<string> = await this.rules(); //get validations and make it array seperated by '|'
      //process the validation in every rules
      const validateResult = await this.processRulesValidation(rules);
      return validateResult ? validateResult : false;
    }



  /**
   * @param rules (array)
   * this method use to process the validation in every rules
   * @return arrResult (error message) / false
   */
  public async processRulesValidation(rules: Array<string>): Promise<any> {
    const arrResult: string[] = [];
    for (let index = 0; index < rules.length; index++) {
      const rule = rules[index];
      // console.log(rule);
      // console.log(this.fieldValue);

      let result = null;
          
      if (rule === ImportValidationEnum.REQUIRED) {
        result = await this.required();
        result != false ? arrResult.push(result) : false;
      } else if (rule === ImportValidationEnum.EMAIL) {
        result = await this.validateEmail();
        result != false ? arrResult.push(result) : false;
      } else if (rule.split(':')[0] === ImportValidationEnum.MIN_LENGTH) {
        result = await this.minLength(parseFloat(rule.split(':')[1]));
        result != false ? arrResult.push(result) : false;
      } else if (rule.split(':')[0] === ImportValidationEnum.MAX_LENGTH) {
        result = await this.maxLength(parseFloat(rule.split(':')[1]));
        result != false ? arrResult.push(result) : false;
      } else if (rule.split(':')[0] === ImportValidationEnum.LENGTH) {
        result = await this.length(parseFloat(rule.split(':')[1]));
        result != false ? arrResult.push(result) : false;
      } else if (rule.split(':')[0] === ImportValidationEnum.ENUM) {
        result = await this.enum(rule.split(':')[1]);
        result != false ? arrResult.push(result) : false;
      } else if (rule.split(':')[0] === ImportValidationEnum.NUMERIC) {
        result = await this.numeric();
        result != false ? arrResult.push(result) : false;
      } else if (rule.split(':')[0] === ImportValidationEnum.ALPHABET) {
        result = await this.alphabet();
        result != false ? arrResult.push(result) : false;
      } else if (rule.split(':')[0] === ImportValidationEnum.DATE) {
        result = await this.date();
        result != false ? arrResult.push(result) : false;
      } else if (rule.split(':')[0] === ImportValidationEnum.MAX_VALUE) {
        /**
         * max value validation
         * require for numeric inputs
         */
        result = await this.maxValue(parseFloat(rule.split(':')[1]));
        result != false ? arrResult.push(result) : false;
      } else if (rule.split(':')[0] === ImportValidationEnum.MIN_VALUE) {
        result = await this.minValue(parseFloat(rule.split(':')[1]));
        result != false ? arrResult.push(result) : false;
      } else if (rule === ImportValidationEnum.NULLABLE) {
        //validation for nullable fields
        result = this.nullable();
        if (result) return false;
      }
    }

    return arrResult.length > 0 ? JSON.stringify(arrResult) : false;
  }


  public async getUploadField(
    headerToFind: string,
    list: any[],
  ): Promise<{ headerField; type; defaultValue; isFound }> {
    let headerField = null;
    let isFound = false;
    let type = null;
    let defaultValue = null;

    for (let y = 0; y < list.length; y++) {
      if (headerToFind === list[y]['value']) {
        headerField = list[y]['field'];
        isFound = true;
        type = list[y]['type'] !== undefined ? list[y]['type'] : 'string';
        defaultValue =
          list[y]['defaultValue'] !== undefined
            ? list[y]['defaultValue']
            : null;
        break;
      }
    }

    return { headerField, type, defaultValue, isFound };
  }


  
  async serializeUploadData(
    data,
    type: string,
    defaultValue: string,
  ): Promise<any | undefined> {
    let newData = data;

    if (data === null || data === '') data = defaultValue;

    switch (type) {
      case 'date':
        // newData = m o ment(data).format('YYYY-MM-DD')
        newData = DateTime.fromJSDate(new Date(data)).toFormat('yyyy-MM-dd');
        break;
      case 'number':
        newData = parseFloat(data);
        break;

      case 'boolean':
        newData = newData == 1 || newData == '1' ? true : false;
      default:
        break;
    }

    return newData;
  }



  public setRowHeader(rowData : any) {
    this.importRow = rowData;
  }

  async parseRowData(model : any, headerImport : any) {

    const dataRow = JSON.parse(this.importRow.RowData);
    const dataHeader = JSON.parse(this.importRow.RowHeader);

    for (const key in dataHeader) {
      if (Object.prototype.hasOwnProperty.call(dataHeader, key)) {
        const header = dataHeader[key];


        const headerFieldResult = await this.getUploadField(
          header,
          headerImport
        );

        if (headerFieldResult.isFound) {
          model[
            headerFieldResult.headerField
          ] = await this.serializeUploadData(
            dataRow[key],
            headerFieldResult.type,
            headerFieldResult.defaultValue,
          );
        }
        
      }
    }

    return model;

  }
  


  private async required() {
    if (isEmpty(this.fieldValue)) return 'This Field is Required';
    else return false;
  }

  private async nullable() {
    return isEmpty(this.fieldValue);
  }

  private async numeric() {
    // if(!isNumber(this.fieldValue))
    const isNumber = new RegExp('/[0-9]/');
    if (isNumber.test(this.fieldValue)) {
      return ` ${this.fieldValue} is not a Numeric `;
    } else return false;
  }

  

  private async alphabet() {
    const hasNumber = new RegExp('/[0-9]/');
    if (hasNumber.test(this.fieldValue))
      return `${this.fieldValue} is required to not contain any numberic data`;
    else return false;
  }

  
  private async validateEmail() {

    if(this.fieldValue == null) 
      return false;

    const emailRegex = new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);
    const isEmail = emailRegex.test(this.fieldValue);
    if(!isEmail)
      return `${this.fieldValue} is not a valid Email`;
    else
      return false;
  }

  private async date() {
    const date = moment(new Date(this.fieldValue));
    if (!date.isValid()) {
      return 'The Date is Invalid';
    } else return false;
  }

  private async minLength(minValue: any) {
    if (this.fieldValue.length < minValue) {
      return ` The required Minimum Length is ${minValue}`;
    } else return false;
  }

  private async maxLength(maxValue: number) {
    if (this.fieldValue.length <= maxValue) return false;
    else {
      return `The required Maximum Length is ${maxValue}`;
    }
  }

  private async minValue(minValue: number) {
    if (parseFloat(this.fieldValue) < minValue) {
      return ` The required Minimum Value is ${minValue}`;
    } else return false;
  }

  private async maxValue(maxValue: number) {
    console.log(parseFloat(this.fieldValue));
    console.log(maxValue);
    if (parseFloat(this.fieldValue) <= maxValue) return false;
    else {
      return ` The required Maximum Value is ${maxValue}`;
    }
  }

  private async length(lengthValue: number) {
    if (this.fieldValue.length != lengthValue) {
      return ` The required Exact Length is ${lengthValue}`;
    } else return false;
  }

  private async enum(enumValue: string) {
    const enumArrValue: string[] = enumValue.split(',');

    let output = false;

    enumArrValue.forEach((enumValue) => {
      if (enumValue === this.fieldValue) {
        output = true;
      }
    });
    if (!output) {
      return ` ${this.fieldValue} is not in the list (${enumValue})`;
    } else return false;
  }

  public async checkRowIfNull(row: any): Promise<boolean> {
    let isNull = true;
    row.forEach((element, index) => {
      if (!isEmpty(element) && element != 'null') {
        isNull = false;
        return false;
      }
    });

    return isNull;
  }






 


}

 