import * as THREE from 'three' ;


/**
 * 전달된 객체의 속성값들을 string[]로 반환
 * @param {THREE.Object3D} obj 
 * @returns 
 */
export const getObjectsKeys = ( obj ) => {

    const keys = [] ;

    for ( const key in obj ) {
        if ( obj.hasOwnProperty( key ) ) {
            keys.push( key ) ;
        }
    }

    return keys ;
}

