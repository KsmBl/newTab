import re

def convertURL(url):
	url = re.sub(r"^(https:\/\/|http:\/\/)", ' ', url.strip()).strip()
	url = re.sub(r"^www.", ' ', url.strip()).strip()
	return url
