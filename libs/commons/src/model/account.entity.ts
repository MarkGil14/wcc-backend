import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AuthCredentialsDto } from '../dto';
import { CustomBaseEntity } from './custom-base.entity';
import { compareSync } from 'bcryptjs';
import { Profile } from '.';
 

@Entity('account')
export class Account extends CustomBaseEntity {

    
    @PrimaryColumn({
        type : 'real'
    })
    id: number;

 

    @Column({
        nullable: false,
        unique : true
    })
    ReferenceNbr : string;




    @Column({
        nullable: false
    })
    AccountType : string;


    @Column({
        nullable: false
    })
    BatchYr : string;





    @Column({
        nullable: true
    })
    ContactNo : string;





    @Column({
        nullable: true
    })
    Email : string;




    @Column({
        nullable: true
    })
    Password : string;




    // @Column({
    //     nullable: false
    // })
    // Active : boolean;




    @Column({
        nullable: true,
        type: 'boolean',    
        default : '0'
    })
    IsVerified : boolean;


    async validatePassword(password : string) : Promise<boolean> {
        return await compareSync(password, this.Password);
    }
    
 
    
    static async ValidateCredential(authCredentialsDto : AuthCredentialsDto) : Promise<any>{

        console.log(authCredentialsDto)
        const {ReferenceNbr , Password } = authCredentialsDto;
  
        const user = await this.findOne({ ReferenceNbr });
        
        if(user)
        {

            const isMatch = await compareSync(Password, user.Password);


          if(isMatch){

              return {
                result : user,
                status : 200
              };
          
          }else{
            return {
                result : false,
                status : 401,
                "message": [
                    "Incorrect Password",
                ],
                "error": "Unathorized User"
              };
          }
        }else{
          return {
                result : false,
                status : 401,
                "message": [
                    "Username Not Found",
                ],
                "error": "Unathorized User"
            };
        }
        
  
    }
  





    @OneToOne(() => Profile)
    @JoinColumn({name: 'id', referencedColumnName: 'accountId'})
    profile : Profile;
    

}