export const Validate = (input) => {
    // console.log(input)
    const arrayVacio = (arr) => !Array.isArray(arr) || arr.length === 0
    let errors = {};

    //------------------------ ValidacionName: --------------------

    if (!input.name) {
        errors.name = 'name is required'
    } else if (/^[0-9]+$/.test(input.name)) {
        errors.name = ' name no debe ser un numero'
    }
    // else if( /^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.name)){
    //     errors.name = 'no se aceptan caracteres especiales'
    // }

    //------------------------ ValidacionImage: --------------------

    if (input.image === '/static/media/image1.322da084.png' || !input.image) {
        errors.image = 'image is required'
    }

    //------------------------ ValidacionDescription: --------------------

    if (!input.description) {
        errors.description = 'description is required'
    }
    // else if( (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.description))){ // revisar, no cumple!! 
    //     errors.description = 'no se aceptan caracteres especiales'
    // }
    else if ( input.description.length > 980){
        errors.description = 'El maximo de caracteres permitido son 980'
    }

    //------------------------ ValidacionReleased: --------------------

    if (!input.released) {
        errors.released = 'released is required'
    }

    //------------------------ ValidacionRating: --------------------

    if (input.rating === 0 || ! input.rating) {
        errors.rating = 'rating is required'
    }

    //------------------------ ValidacionPlatforms: --------------------

    if (arrayVacio(input.platforms )) {
        errors.platforms = 'platforms is required'
    }

    //------------------------ ValidacionGenres: --------------------

    if (arrayVacio(input.genres )) {
        errors.genres = 'genres is required'
    }



    return errors;
}