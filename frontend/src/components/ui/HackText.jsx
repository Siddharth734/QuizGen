import { useRef, useState } from 'react';

export default function HackText({ s_text, text }) {
    const symbols = '$#@!^%&*()_+{}|:"<>?~`-=][\;/.,*&^%$#@!';
    const OGtxt = text;
    const Rtxt = s_text;
    const [hackTxt,setHackTxt] = useState(Rtxt);
    const txtRef = useRef(null);

    let iteration = 0;

    function txtEntry(){
        if(txtRef.current) return;
        txtRef.current = setInterval(() => {
            // map is used bcs it returns an array
            const newTxt = OGtxt.split('').map((char, index) => {
                if(index < iteration)
                    return char;
                return symbols.split('')[Math.floor(Math.random()*symbols.length)];
            }).join('');
            iteration += 0.2;
            
            setHackTxt(newTxt);
        },30)
    }

    function txtLeave() {
        clearInterval(txtRef.current);
        txtRef.current = null;
        setHackTxt(Rtxt);
    }
    
    return (
        <>
            <div className='hover:text-green-400'>
                <div onMouseEnter={txtEntry} onMouseLeave={txtLeave}>
                    <h1>{hackTxt}</h1>
                </div>
            </div>
        </>
    );
}