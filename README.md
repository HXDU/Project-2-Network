# Project-2-Network  
# Data Collection  
Use Tweepy to collect the top 15 pages' tweets of Donald Trump and Barack Obama. Refer to the tweetsCollection.ipynb file.  
There are 2456 tweets of Trump, which dated back to 06-27-2018.  
There are 2658 tweets of Obama, which dated back to 11-10-2014.   
We build a network based on '@'. 297 tweets of Trump's and 274  tweets of Obama's are qualified.  

# Data Set  
trumptweets.csv and obamatweets.csv are files of tweets, there are four attributes: favourite_count, retweet_account, time(when the tweet was posted), tweet(unprocessed).
trumplinks.csv and obamalinks.csv are files of processed tweets, there are six attributes: start(user, Trump or Obama), dest@(people who were mentioned in this tweet following "@"), favourite_count, retweet_account, time, tweet(removed url, Non-Ascii characters and the user names that were mentioned via "@"). 
