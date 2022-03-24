import Link from "next/link";
import styles from '../styles/PostingCardLarge.module.css';

export default function PostingCardLarge({ posting }: any) {
    return (
        <div className={styles.container}>
            <Link href={'/'}>
                <a>{'<'}Back to main</a>
            </Link>
            <h5>{posting.title}</h5>
            <p>Location: {posting.location}</p>
            <p className={styles.description}>{posting.description}</p>
            <a target={'_blank'} rel={'noreferrer'} className={styles.applyButton} href={posting.applyButtonUrl}>Apply</a>
        </div>
    );
}