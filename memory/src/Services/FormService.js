import Joi from 'joi-browser';
import FormError from '../Errors/FormError';

const postSchema = {
    title: Joi.string().required().min(1),
    text: Joi.string().required().min(1),
}

export const validateInputText = (post) =>{
    console.log(post);
    return Joi.validate(post, postSchema);
}

export const validateInputFile = (imageFile) => {
    if(!imageFile){
        return new FormError("File input must not be empty!");
    }
    if(!imageFile.name.match(/\.(jpg|jpeg|png)$/)){
        return new FormError("Invalid image type! Please select a valid image type! (jpg|jpeg|png)");
    }
    

}

