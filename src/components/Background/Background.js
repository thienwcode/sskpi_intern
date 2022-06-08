import style from './Background.module.css'
// console.log(style);

function Background() {
    return (
        <div className={style.bgImg}>
            <img  src="https://cms-test.srequests.com/static/media/bg_login.1ed6daba492a82b7b0d2.png"></img>
        </div>
    )
}

export default Background;