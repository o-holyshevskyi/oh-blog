export const updateReaction = async (
        postId: string, 
        emoji: string, 
        hasUserReacted, 
        setHasUserReacted,
        setReactionsData
    ) => {
    if (hasUserReacted[postId]) {
      return;
    }
    
    try {
      const response = await fetch('/api/updateReactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId, emoji }),
      });

      if (response.ok) {
        setHasUserReacted((prev) => ({ ...prev, [postId]: true }));
        await fetchReactionsData(postId, setReactionsData);
      } else {
        console.error('Failed to update reactions');
      }
    } catch (error) {
      console.error('Error updating reactions:', error);
    }
};

export const fetchReactionsData = async (postId: string, setReactionsData) => {
    try {
      const response = await fetch(`/api/reactions?postId=${postId}`);
      if (response.ok) {
        const newData = await response.json();
        setReactionsData(newData);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };