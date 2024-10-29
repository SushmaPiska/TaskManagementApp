
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

 export const getTodayDate=() =>{
    const date = new Date();
    
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    return `${day}${daySuffix(day)} ${month}, ${year}`;
  }