const fs=require('fs');
const path=require('path');


module.exports={

    addEmail:function(req,res){
        req.checkBody("email", 'Invalid Email or Empty field!').notEmpty().isEmail();
        var errors=req.validationErrors();

        if(errors)
        {
            console.log(errors);
            res.end(errors[0].msg);
        }

        else{
            let text=req.body.email+'   ';
            let r=fs.readFileSync('./dataSource/subscribers.txt','utf8');
            console.log('read'+r);
            text+=r;
            fs.writeFile('./dataSource/subscribers.txt',text,function(e,data)
            {

                console.log('WRITE '+data);
            });

            res.render('./thankyou.ejs',{email:req.body.email});
        }


    }//ends addEmail


}//ends module.exports
