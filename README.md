# Project 2: Shared Twitter Mentions and Hashtags between Trump and Obama
http://project2.noahgomez.com

# Project Video (Youtube Link)
https://www.youtube.com/watch?v=ldNwQg_eMhc&feature=youtu.be

# Team Contributions:
H. Du:
- Completed gathering, filtering &  formatting of the tweet data in both CSV and JSON files. Hashtag, and mention data in seperate files from both Trump & Obama twitter accounts respectivly
- Created the word clouds for both Trump & Obama

N. Gomez:
- Completed the Frontend (HTML, JS) and edited D3 graph code to fit the tweet data
- Created JS functions for appropriate data interpretation and presentation, along with adding/editing twitter links as well as bundling tweet data by quartile and created custom HTML/JS to showcase links based on timeframe once user has clicked a quartile


# Data Collection  
Use Tweepy to collect the top 16 pages' tweets of Donald Trump and Barack Obama. Refer to the tweetsCollection.ipynb file.
Since they both have a personal account and an official presidential account, we collected both of them.  
For their personal accounts:  
There are 2674 tweets of Trump, which dated back from 03-22-2019 to 06-13-2018.  
There are 2932 tweets of Obama, which dated back from 03-22-2019 to 09-22-2014.     
For their official accounts:
There are 3766 tweets of Trump, there are 5514 tweets in total in his account.
There are 337 tweets of Obama, which almost covers his whole presidency. 

# Data Set  
trumptweets.csv and obamatweets.csv are files of tweets, there are four attributes: favourite_count, retweet_account, time(when the tweet was posted), tweet(unprocessed).   
We build a network based on '@'. 444 tweets of Trump's and 296 tweets of Obama's are qualified. As one tweet may "@" 1 or more users, Trump mentioned 560 people in his tweets, the number for Obama is 313. There are 12 users in common, they are: 'ABC', 'nytimes', 'business', 'FLOTUS', 'WSJ', 'VP', 'USArmy', 'DHSgov', 'CNN', 'NYTimes', 'WhiteHouse', 'POTUS'.    
trumplinks.csv and obamalinks.csv are files of processed tweets, there are six attributes: start(user, Trump or Obama), dest@(people who were mentioned in this tweet following "@"), favourite_count, retweet_account, time, url(the url for this tweet, if there is), tweet(removed url, Non-Ascii characters and the user names that were mentioned via "@").   
trumpcommon.csv and obamacommon.csv are in the same format with trumplinks.csv, except that the users who were mentioned via @ are shared by Trump's and Obama's tweets.   
Similarly, we extracted a shared hashtag data set based on the tweets we collected to see the common hashtags that were used by Trump and Obama.
185 of Trump's tweets have hashtags, we retrieved a total 200 hashtags as some of his tweets used more than one hashtag in one tweet, some of his tweets used repeated hashtags. 
Surprisingly, 1530 of Obama's tweets are marked with hashtags and we collected 1614 hashtags in total. 
For Trump and Obama, they shared 7 unique hashtags based on our data set, they are: 'SCOTUS', 'MadeInAmerica', 'FlagDay', 'TBT', 'MLKDay', 'SOTU',and 'UNGA'. On this account, 16 of Trump's tweets and 170 of Obama's tweets are visualized in this project.  
For their official accounts, 241 of Trump's tweets have hashtags and there are 280 hashtage; Surprisingly, only 34 of Obama's tweets have hashtags and there are 35 hashtags. Their shared hashtags are: MLKDay, 1, and InternationalWomensDay. 1 is not acturally one hashtag but was shown in the term of "#1". That is why it was chosen when we preprocess the data.
For their official accounts, there are 8 shared user account: '', 'Space_Station', 'JustinTrudeau', 'FLOTUS', 'VP', 'NASA', 'NatlParkService', 'POTUS'. 

# Findings:
1. It is not a secert that Donald Trump is one fervent Twiiter user. However, numbers may surprise people. The average number of favorite count and retweet count for his tweets (common @ with Obama) exceed Obama's. We plot a bar chart to visualize the difference between them. 
![image](https://github.com/HXDU/Project-2-Network/blob/master/compare.png)  
The difference is so large that we take a base 2 log to make the bars representing Obama more visible.
![image](https://github.com/HXDU/Project-2-Network/blob/master/log_compare.png)  
2. While Trump is fond of tweeting, Obama loves hashtags so much that the number of his hashtaged tweets is about 8 times of Trump's. 

# Tweet Word clouds

Both wordcould graphs take their official account and personal account as the data source. Tweets have been preprocessed by: removing stopwords, hashtags, urls and mentioning names, getting tokenized and lemmatized, then were used to generate the wordcloud. 

### Trump wordcloud
https://backendlessappcontent.com/C26D8816-5228-6E63-FF5C-9AF05C4C3D00/console/hvrfcpuajpwjgidevigxbipjnovtshyrrext/files/view/trump_wc.png 

### Obama wordcloud
https://backendlessappcontent.com/C26D8816-5228-6E63-FF5C-9AF05C4C3D00/console/hvrfcpuajpwjgidevigxbipjnovtshyrrext/files/view/obama_wc.png

# D3 Concept network browser (That we built on): http://www.findtheconversation.com/concept-map/
Source code found on https://github.com/d3/d3/wiki/Gallery (CTRL+F "Concept network browser")

