import * as THREE from 'three' ;


/**
 * 
 * @param {THREE.Scene} scene 
 * @returns 
 */
export const foreverPlane = ( scene ) => {

    const geo = new THREE.PlaneBufferGeometry( 10000, 10000 ) ;
    const mat = new THREE.MeshLambertMaterial( {
        color: 0xffffff
    } ) ;
    const msh = new THREE.Mesh( geo, mat ) ;
    msh.position.set( 0, -2, 0 ) ;
    msh.rotation.set( Math.PI / -2, 0, 0 ) ;
    msh.receiveShadow = true ;
    msh.name = 'forever-floor' ;

    scene.add( msh ) ;

    return msh ;
}

/**
 * 
 * @param {THREE.Scene} scene 
 * @param {number} size 
 * @returns 
 */
export const floatingFloor = ( scene, size ) => {

    const s = size ? size : 6
    const geo = new THREE.BoxBufferGeometry( s, 0.25, s, 10, 10, 10 )
    const mat = new THREE.MeshStandardMaterial( {
        color: 0xdddddd
    } )
    const mesh = new THREE.Mesh( geo, mat )
    mesh.position.set( 0, -2, -1 )
    mesh.receiveShadow = true
    mesh.name = 'floating-floor'
    scene.add( mesh )

    return mesh
}
