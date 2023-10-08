import styles from './my-skills.module.css';
import Date from '../../date/date';
import utilStyles from '../../../styles/utils.module.css';

const certificates = [
    {
        name: 'Certified Tester, Foundation Level',
        date: '2020-11-01',
        id: '20-CTFL-181825-12',
        skills: [ 'Testing', 'Manual Testing' ],
    },
    {
        name: 'JavaScript Starter',
        date: '2023-02-01',
        id: 'TP64118432',
        skills: [ 'JavaScript' ],
    },
    {
        name: 'Git bases',
        date: '2023-03-01',
        id: 'TP25340100',
        skills: [ 'Git' ],
    },
];

export default function Certificates() {
    return (
        <div>
            {
                certificates.map((cert, i) => (
                    <>
                        <div key={i} className={styles.certificate}>
                            <h2><strong>{cert.name}</strong></h2>
                            <Date dateString={cert.date}></Date>
                            <div><strong>Credential ID:</strong> {cert.id}</div>
                            <div className={styles.skills}>
                                <strong>Skills:</strong> {
                                    cert.skills.map((skill, index) => (
                                        <div key={index} className={styles.skill}>
                                            {skill}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={utilStyles.delimiter}></div>
                    </>
                ))
            }
        </div>
    );
}
