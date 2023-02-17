import styles from 'styles/Header.module.css'

export default function Header() {
  return (
    <div className='container mt-4'>
        <div className="row">
            <div className="col-6 align-items-center d-flex">
                <p className={styles.link}>
                  <a href='https://breeze.ai/' target={'_blank'} rel="noreferrer" className="blue">breeze.ai</a>
                </p>
            </div>
            <div className="col-6 align-items-center justify-content-end d-flex">
                <p className={`${styles.link1}`}>
                  <a href='https://help.breeze.ai/' target={'_blank'} rel="noreferrer">Help</a>
                </p>
            </div>
        </div>
    </div>
  )
}
