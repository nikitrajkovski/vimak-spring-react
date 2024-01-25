import '../hero/Hero.css'
import Logo from '../hero/Logo.js'


export default function Footer() {
    return (
        <div className="footer">
        <div className="f1">
            <div id="kontakt">Контакт:</div>
            <div className='kf1'>Е-пошта: vimak@vimak.com</div>
            <div className='kf1'>Телефон: 070/000-000</div>
            <br></br>
            <div>Сите права се задржани</div>
        </div>
        <div className="f2">
        <div className='f2Logo'>
                <Logo/>
            </div>
        </div>
        <div className="f3">
        <br/>
            <div id="politika">Политика на приватност</div>
            <div>Услови за купување</div>
        </div>
        </div>
    )
}



