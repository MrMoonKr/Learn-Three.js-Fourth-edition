import * as THREE from 'three' ;


/**
 * 객체의 자식 노드상대로 fn 콜백처리 및 객체 상대 fn 콜백처리
 * @param {THREE.Object3D} object 
 * @param {function(THREE.Object3D)} fn 
 */
export const visitChildren = ( object, fn ) => {

    if ( object.children && object.children.length > 0 ) {
        for ( const child of object.children ) {
            visitChildren( child, fn ) ;
        }
    } 
    else {
        fn( object ) ;
    }
}

/**
 * 
 * @param {THREE.Object3D} object 
 */
export const applyShadowsAndDepthWrite = ( object ) => {

    visitChildren( object, ( child ) => {
        if ( child.material ) {
            child.material.depthWrite = true
            child.castShadow = true
            child.receiveShadow = true
        }
    } )
}

/**
 * 
 * @param {THREE.Object3D} object 
 * @param {string} name 
 * @returns {THREE.Object3D|undefined}
 */
export const findChild = ( object, name ) => {

    if ( object.children && object.children.length > 0 ) {
        for ( const child of object.children ) {
            if ( name === child.name ) {
                return child
            } 
            else {
                const res = findChild( child, name )
                if ( res ) {
                    return res
                }
            }
        }
    } 
    else {
        if ( name === object.name ) {
            return object
        } 
        else {
            return undefined
        }
    }
}
