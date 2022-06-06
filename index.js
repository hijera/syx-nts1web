const fs=require("fs");
let data = JSON.parse(fs.readFileSync('template.json', 'utf8'));
const file_args=process.argv.slice(2);
/*
    nts 1 vst plugin *.syx format:
    00: osc type
    01: osc shape
    02: attack
    03: release
    04: eg tremolo rate
    05: eg tremolo depth
    06: lfo rate
    07: lfo depth
    08: eg type
    09: mod fx type
    0a: undefined (always 00)
    0b: delay fx type
    0c: rev fx type
    0d: vcf filter type
    0e: arp type
    0f: undefined (always 01)
    10: undefined (always 01)
    11: osc alternative
    12: arp intervals
    13: arp length
    14: vcf cutoff
    15: vcf resonanse
    16: vcf sweep rate
    17: vcf sweep depth
    18: mod fx time
    19: rev fx time
    1a: delay fx time
    1b: mod fx depth
    1c: rev fx depth
    1d: delay fx depth
    1e: delay fx mix
    1f: rev fx mix
 */

file_args.forEach(filename_item=>{


const fname=filename_item;
if (fname && fname.match(/\.syx$/gi))
{

    try {
        binary=fs.readFileSync(fname)
        //process.stdout.write(binary.slice(0, 48));
        const buffer=new Uint16Array(binary);
        console.log(buffer);
        let newpatch=data.synth.patches[0];
        const val_array=[
            [14,0x08],[16,0x02],[19,0x03],
            [20,0x05],[21,0x04],
            [24,0x06], [26,0x07],
            [28,0x18],[29,0x1b],
            [30,0x1a],[31,0x1d],[33,0x1e],
            [34,0x19],[35,0x1c],[36,0x1f],
            [42,0x0d],[43,0x14],[44,0x15],
            [45,0x17],[46,0x16],
            [53,0x00],[54,0x01],[55,0x11],
            [88,0x09],
            [89,0x0b],
            [90,0x0c],
            [117,0x0e],[118,0x12],[119,0x13]
        ]
        val_array.forEach(item=>{
            newpatch[item[0]].value=buffer[item[1]];
        });

        data.synth.patches[0]=newpatch;
        console.log('writing file');
        const newfilename=fname.replace(/\.syx$/i,".ntsweb");
        const newfilename_patch=fname.replace(/\.syx$/i,".ntspatch");
        fs.writeFileSync(newfilename_patch,JSON.stringify(newpatch));
        fs.writeFileSync(newfilename,JSON.stringify(data));

    }
    catch (e)
    {

    }

}
else
    console.log("file "+filename_items+" is not a SYX file");
})

