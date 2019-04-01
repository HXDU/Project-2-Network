# Project-2-Network  
# Data Collection  
Use Tweepy to collect the top 16 pages' tweets of Donald Trump and Barack Obama. Refer to the tweetsCollection.ipynb file.  
There are 2674 tweets of Trump, which dated back from 03-22-2019 to 06-13-2018.  
There are 2932 tweets of Obama, which dated back from 03-22-2019 to 09-22-2014.   


# Data Set  
trumptweets.csv and obamatweets.csv are files of tweets, there are four attributes: favourite_count, retweet_account, time(when the tweet was posted), tweet(unprocessed).   
We build a network based on '@'. 444 tweets of Trump's and 296 tweets of Obama's are qualified. As one tweet may "@" 1 or more users, Trump mentioned 560 people in his tweets, the number for Obama is 313. There are 12 users in common, they are: 'ABC', 'nytimes', 'business', 'FLOTUS', 'WSJ', 'VP', 'USArmy', 'DHSgov', 'CNN', 'NYTimes', 'WhiteHouse', 'POTUS'.    
trumplinks.csv and obamalinks.csv are files of processed tweets, there are six attributes: start(user, Trump or Obama), dest@(people who were mentioned in this tweet following "@"), favourite_count, retweet_account, time, url(the url for this tweet, if there is), tweet(removed url, Non-Ascii characters and the user names that were mentioned via "@").   
trumpcommon.csv and obamacommon.csv are in the same format with trumplinks.csv, except that the users who were mentioned via @ are shared by Trump's and Obama's tweets. 




# D3 Example found on https://github.com/d3/d3/wiki/Gallery:
http://www.findtheconversation.com/concept-map/
  
# Findings:
1. It is not a secert that Donald Trump is one fervent Twiiter user. However, numbers may surprise people. The average number of favorite count and retweet count for his tweets (common @ with Obama) exceed Obama's. We plot a bar chart to visualize the difference between them. 
![image](https://github.com/HXDU/Project-2-Network/blob/master/compare.png)  
The difference is so large that we take a base 2 log to make the bars representing Obama more visible.
![image](https://github.com/HXDU/Project-2-Network/blob/master/log_compare.png)
