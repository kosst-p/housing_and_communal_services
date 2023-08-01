import os from 'os';
// import cluster from 'cluster';

// console.log( os.platform() );
// console.log( os.arch() );
// console.log( os.cpus() );

const cpus = os.cpus();

for ( let index = 0; index < cpus.length - 2; index++ ) {
    // const CPUcore = cpus[index];

}