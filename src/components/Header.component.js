import styles from '@/styles/Header.module.css'

export default function Header() {
  return (
    <div className='container mt-4'>
        <div className="row">
            <div className="col-6">
                <p className={styles.link}>#breeze.ai</p>
            </div>
            <div className="col-6 cursor-pointer">
                <p className={`${styles.link1}`}>Try it for free!</p>
            </div>
        </div>
    </div>
  )
}
