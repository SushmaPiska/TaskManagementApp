
export const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    const options = { month: 'short' };
    const month = new Intl.DateTimeFormat('en-US', options).format(date); 
    
    const day = date.getDate();
  
   
    let suffix = 'th';
    if (day % 10 === 1 && day !== 11) suffix = 'st';
    else if (day % 10 === 2 && day !== 12) suffix = 'nd';
    else if (day % 10 === 3 && day !== 13) suffix = 'rd';
  
    return `${month} ${day}${suffix}`;
  };