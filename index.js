const { BHN } = require('bhn');

let blockHeaderTupleArray = [];
let timeDelta = 60*60*2;

const node = new BHN({
    file: true,
    argv: true,
    env: true,
    logFile: true,
    logConsole: true,
    logLevel: 'debug',
    db: 'leveldb',
    memory: false,
    persistent: true,
    workers: true,
    listen: true,
    loader: require,
  });



async function calculateBlockDelta() { 
  await node.ensure();
  await node.open();

  let header_i = await node.getHeader(0);

for(i = 0; i < node.headerindex.height; i++){
    console.log(`Checking block time delta at height ${i}` )
    let header_iplus1 = await node.getHeader(i+1);
    if(header_iplus1.time-header_i.time >= timeDelta){
        console.log(header_i);
        console.log(header_iplus1);
        blockHeaderTupleArray.push( (header_i, header_iplus1 ) );

    }
    header_i = header_iplus1;
}
console.log(`Final count of >= 2-hour difference blocks is ${blockHeaderTupleArray.length}`)
await node.close();

}


calculateBlockDelta();