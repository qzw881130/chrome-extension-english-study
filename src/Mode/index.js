import { useEffect, useState } from 'react'
import { storage } from 'webextension-polyfill'
import { getCurrentTab } from '../helpers/tabs'

export const Mode = () => {
    const [mv, setMv] = useState('0');

    useEffect(()=>{
        console.log('mv=', mv)
    }, [mv])

    return (
        <div>
            <p><input type="radio"  value='0' checked={mv == '0'} onChange={()=>setMv('0')} />Single loop
            &nbsp;
            <input type="radio" value='1' checked={mv == '1'}  onChange={()=>setMv('1')} />Random loop
            </p>

        </div>
    )
}