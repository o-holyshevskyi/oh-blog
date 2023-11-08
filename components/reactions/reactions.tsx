import { updateReaction } from '../../controller/reactions/reactions';
import utilStyles from '../../styles/utils.module.css';

export default function Reactions({ reactionsData, hasUserReacted, setHasUserReacted, setReactionsData }) {
    return (
        <div>
          {reactionsData.map((reactionData) => {
            const { _id, postId, reactions } = reactionData;
            return (
              <div key={_id} className={utilStyles.reactionsSection}>
                <div className={utilStyles.reactions}>
                  <div 
                    className={utilStyles.reaction} 
                    onClick={() => updateReaction(
                      postId, 
                      'like',
                      hasUserReacted,
                      setHasUserReacted,
                      setReactionsData)}>
                    👍
                  </div>
                  <div className={utilStyles.reactionCount}>
                    {reactions.like}
                  </div>
                </div>
                <div className={utilStyles.reactions}>
                  <div 
                    className={utilStyles.reaction} 
                    onClick={() => updateReaction(
                      postId, 
                      'heart',
                      hasUserReacted,
                      setHasUserReacted,
                      setReactionsData)}>
                    ❤️
                  </div>
                  <div className={utilStyles.reactionCount}>
                    {reactions.heart}
                  </div>
                </div>
                <div className={utilStyles.reactions}>
                  <div 
                    className={utilStyles.reaction} 
                    onClick={() => updateReaction(
                      postId, 
                      'fire',
                      hasUserReacted,
                      setHasUserReacted,
                      setReactionsData)}>
                    🔥 
                  </div>
                  <div className={utilStyles.reactionCount}>
                    {reactions.fire}
                  </div>
                </div>
                <div className={utilStyles.reactions}>
                  <div 
                    className={utilStyles.reaction} 
                    onClick={() => updateReaction(
                      postId, 
                      'think',
                      hasUserReacted,
                      setHasUserReacted,
                      setReactionsData)}>
                    🤔 
                  </div>
                  <div className={utilStyles.reactionCount}>
                    {reactions.think}
                  </div>
                </div>
              </div>
            );
        })}
        </div>
    );
}
