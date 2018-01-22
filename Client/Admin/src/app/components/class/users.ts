export class Users {
    _id:String;
    username:String;
    password:String;
    firstname:String;
    lastname:String;
    email:String;
    isAgreemented:Boolean;
    isVerified:Boolean;
    resetpwdToken:String;
    resetpwdExpiredOn:String;
    isProfileSet:Boolean; 
    roles:String;
    person_photo:String;
}