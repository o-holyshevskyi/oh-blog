import Date from "../../date/date";
import styles from './my-skills.module.css';
import utilStyles from '../../../styles/utils.module.css';

export default function Education() {
    return (
        <div>
            <div>
                <div className={styles.education}>
                    <h2>Sumy State University</h2>
                </div>
                <div>
                    <Date dateString='2016-09-01'></Date> - <Date dateString='2018-03-31'></Date>
                    <p>Master's degree, Material science</p>
                </div>
            </div>
            <div className={utilStyles.delimiter}></div>
            <div>
                <div className={styles.education}>
                    <h2>Sumy State University</h2>
                </div>
                <div>
                    <Date dateString='2012-09-01'></Date> - <Date dateString='2016-05-31'></Date>
                    <p>Bachelor's degree, Material science</p>
                </div>
            </div>
        </div>
    );
}
