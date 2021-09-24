class Content:
    """
    페이지의 내용에 대한 모델
    url, 제목, 내용, 대표 이미지가 있다.
    Website 모델을 토대로 얻은 정보들을 담고 있다.
    """
    def __init__(self, url, title, body, img_url, site, subject, id):
        self.url = url
        self.title = title
        self.body = body
        self.img_url = img_url
        self.site = site
        self.subject = subject
        self.id = id

    def __str__(self):
        result = ""
        result += f"URL: {self.url}\n"
        result += f"Title: {self.title}\n"
        result += f"Body: {self.body[:25]}\n"
        result += f"Img_url: {self.img_url}\n"
        return result

def contents_factory(contents_page_url, soup, contents_page):
    """
    페이지 soup을 이용해 Content 객체를 리턴하는 함수
    news_url은 그저 Content를 생성하기 위해 전달받았다.

    url이 없는 경우는 일단 NULL을 리턴하도록 설계하였다.

    """
    # title
    try:
        title_div = soup.find(contents_page.title_div, class_=contents_page.title_div_class)

        try:
            title = title_div.find(contents_page.title_tag)[contents_page.title_tag_class].get_text()
        except KeyError:
            title = title_div.find(contents_page.title_tag).get_text()
    except AttributeError:
        title = "제목이 없습니다."

    # body
    try:
        body_div = soup.find(contents_page.body_div, class_=contents_page.body_div_class)
        body = str.strip(body_div.get_text())
    except AttributeError:
        body = "내용이 없습니다."
    
    # img
    try:
        img_div = soup.find(contents_page.img_div, class_=contents_page.img_div_class)
        img_url = img_div.find('img')['src']
    except:
        img_url = None
    

    content = Content(contents_page_url, title, body, img_url)

    print(content)
    return content
