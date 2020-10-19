import '@testing-library/jest-dom';
import React from 'react';
import { shallow } from 'enzyme';
import { fileUpload } from '../helpers/fileUpload';
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dyqatwbhn', 
    api_key: '637339799154695', 
    api_secret: 'd-Xy_BVsb5dYC-CQ9dHRwD3fcJI' 
  });

describe ('Pruebas de fileUpload', ()=> {

    test('debe de subir un archivo', async () => {
        
        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();
        const file = new File([blob],'foto.img');
        const url = await fileUpload ( file );
        
        expect (typeof url).toBe('string');

        const segments = url.split('/');
        const imageid = segments[segments.length - 1].replace ('.png','');

        cloudinary.v2.api.delete_resources(imageid, {}, (resp)=>{
            done();
        });
    });

    test('debe de subir un archivo', async () => {
        
        const file = new File([],'foto.img');
        const url = await fileUpload ( file );
        
        expect ( url).toBe(null);
    });

});