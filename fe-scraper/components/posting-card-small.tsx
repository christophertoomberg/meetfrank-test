import Link from "next/link";
import styles from '../styles/PostingCardSmall.module.css';

export default function PostingCardSmall({ posting }: any) {

    return (
        <Link href={`/${posting.id}`}>
            <a>
                <div className={styles.card}>
                    <p>{posting.title}</p>
                    <p>{posting.location}</p>
                    <a target={'_blank'} rel={'noreferrer'} href={posting.applyButtonUrl}>Apply</a>
                </div>
            </a>
        </Link>
    );
}