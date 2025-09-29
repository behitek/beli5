# 🕷️ Web Scraper - Thu Thập Dữ Liệu Từ Web

:::info
Xây dựng một bot thu thập dữ liệu thông minh từ các trang web - giống như một thám tử kỹ thuật số!
:::

## 🎯 Mục tiêu dự án

Tạo một Web Scraper có thể:
- 🌐 **Thu thập dữ liệu** từ các trang web
- 📊 **Phân tích và xử lý** dữ liệu thu thập được
- 💾 **Lưu trữ** vào nhiều định dạng (JSON, CSV, Database)
- 🔄 **Lập lịch** thu thập tự động
- 🛡️ **Xử lý lỗi** và retry thông minh
- 📈 **Thống kê** và báo cáo chi tiết

## 🛠️ Chuẩn bị

### Thư viện cần thiết

```python
import requests
import time
import json
import csv
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import pandas as pd
from dataclasses import dataclass
from typing import List, Dict, Optional
import logging
import sqlite3
from concurrent.futures import ThreadPoolExecutor
import schedule
import random
from fake_useragent import UserAgent
```

### Cài đặt thư viện

```bash
pip install requests beautifulsoup4 pandas fake-useragent schedule lxml
```

## 🏗️ Xây dựng Web Scraper

### 1. Base Scraper Class

```python
import requests
from bs4 import BeautifulSoup
import time
import json
from datetime import datetime
import logging
from fake_useragent import UserAgent
from urllib.parse import urljoin, urlparse
import random

class WebScraper:
    """
    Base Web Scraper class
    Giống như một thám tử kỹ thuật số thông minh!
    """
    
    def __init__(self, base_url="", delay_range=(1, 3), timeout=10):
        self.base_url = base_url
        self.delay_range = delay_range
        self.timeout = timeout
        self.session = requests.Session()
        self.ua = UserAgent()
        
        # Statistics
        self.requests_made = 0
        self.successful_requests = 0
        self.failed_requests = 0
        self.start_time = datetime.now()
        
        # Setup logging
        self.setup_logging()
        
        # Setup session headers
        self.setup_session()
    
    def setup_logging(self):
        """Thiết lập logging"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('scraper.log'),
                logging.StreamHandler()
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def setup_session(self):
        """Thiết lập session với headers giả lập"""
        self.session.headers.update({
            'User-Agent': self.ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1'
        })
    
    def random_delay(self):
        """Delay ngẫu nhiên để tránh bị block"""
        delay = random.uniform(self.delay_range[0], self.delay_range[1])
        time.sleep(delay)
    
    def make_request(self, url, max_retries=3):
        """Thực hiện request với retry logic"""
        self.requests_made += 1
        
        for attempt in range(max_retries):
            try:
                self.logger.info(f"🌐 Requesting: {url} (Attempt {attempt + 1})")
                
                # Random User-Agent cho mỗi request
                self.session.headers['User-Agent'] = self.ua.random
                
                response = self.session.get(url, timeout=self.timeout)
                response.raise_for_status()
                
                self.successful_requests += 1
                self.logger.info(f"✅ Success: {url}")
                
                # Random delay
                self.random_delay()
                
                return response
                
            except requests.exceptions.RequestException as e:
                self.logger.warning(f"⚠️ Attempt {attempt + 1} failed for {url}: {e}")
                
                if attempt < max_retries - 1:
                    # Exponential backoff
                    wait_time = (2 ** attempt) + random.uniform(1, 3)
                    time.sleep(wait_time)
                else:
                    self.failed_requests += 1
                    self.logger.error(f"❌ All attempts failed for {url}")
                    return None
    
    def parse_html(self, html_content):
        """Parse HTML content"""
        return BeautifulSoup(html_content, 'html.parser')
    
    def get_absolute_url(self, relative_url):
        """Chuyển relative URL thành absolute URL"""
        return urljoin(self.base_url, relative_url)
    
    def extract_text(self, element):
        """Extract và clean text từ element"""
        if element:
            return element.get_text(strip=True)
        return ""
    
    def extract_links(self, soup, selector="a[href]"):
        """Extract tất cả links từ page"""
        links = []
        for link in soup.select(selector):
            href = link.get('href')
            if href:
                absolute_url = self.get_absolute_url(href)
                links.append({
                    'url': absolute_url,
                    'text': self.extract_text(link),
                    'title': link.get('title', '')
                })
        return links
    
    def get_statistics(self):
        """Lấy thống kê scraping"""
        runtime = datetime.now() - self.start_time
        
        return {
            'requests_made': self.requests_made,
            'successful_requests': self.successful_requests,
            'failed_requests': self.failed_requests,
            'success_rate': (self.successful_requests / self.requests_made * 100) if self.requests_made > 0 else 0,
            'runtime': str(runtime),
            'requests_per_minute': self.requests_made / (runtime.total_seconds() / 60) if runtime.total_seconds() > 0 else 0
        }
    
    def save_to_json(self, data, filename):
        """Lưu dữ liệu vào JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2, default=str)
        self.logger.info(f"💾 Saved data to {filename}")
    
    def save_to_csv(self, data, filename):
        """Lưu dữ liệu vào CSV file"""
        if data:
            df = pd.DataFrame(data)
            df.to_csv(filename, index=False, encoding='utf-8')
            self.logger.info(f"📊 Saved data to {filename}")

print("✅ WebScraper base class đã được định nghĩa!")
```

### 2. News Scraper - Thu thập tin tức

```python
from dataclasses import dataclass
from typing import List
import re

@dataclass
class NewsArticle:
    """Data class cho bài báo"""
    title: str
    url: str
    summary: str
    author: str
    publish_date: str
    category: str
    content: str = ""
    tags: List[str] = None
    
    def __post_init__(self):
        if self.tags is None:
            self.tags = []

class NewsScraper(WebScraper):
    """
    News Scraper chuyên thu thập tin tức
    Giống như một phóng viên robot!
    """
    
    def __init__(self, base_url):
        super().__init__(base_url)
        self.articles = []
    
    def scrape_vnexpress_homepage(self):
        """Scrape trang chủ VnExpress (demo)"""
        self.logger.info("📰 Bắt đầu scrape VnExpress homepage...")
        
        response = self.make_request(self.base_url)
        if not response:
            return []
        
        soup = self.parse_html(response.content)
        articles = []
        
        # Scrape main articles
        main_articles = soup.select('.item-news')
        
        for article in main_articles[:10]:  # Lấy 10 bài đầu
            try:
                # Extract title and URL
                title_element = article.select_one('.title-news a')
                if not title_element:
                    continue
                
                title = self.extract_text(title_element)
                url = title_element.get('href', '')
                
                # Extract summary
                summary_element = article.select_one('.description a')
                summary = self.extract_text(summary_element) if summary_element else ""
                
                # Extract category từ URL hoặc class
                category = self.extract_category_from_url(url)
                
                # Extract publish date
                date_element = article.select_one('.time')
                publish_date = self.extract_text(date_element) if date_element else ""
                
                article_data = NewsArticle(
                    title=title,
                    url=url,
                    summary=summary,
                    author="VnExpress",
                    publish_date=publish_date,
                    category=category
                )
                
                articles.append(article_data)
                self.logger.info(f"📄 Scraped article: {title[:50]}...")
                
            except Exception as e:
                self.logger.error(f"❌ Error scraping article: {e}")
                continue
        
        self.articles.extend(articles)
        self.logger.info(f"✅ Scraped {len(articles)} articles from homepage")
        return articles
    
    def extract_category_from_url(self, url):
        """Extract category từ URL"""
        if '/the-thao/' in url:
            return "Thể thao"
        elif '/giai-tri/' in url:
            return "Giải trí"
        elif '/kinh-doanh/' in url:
            return "Kinh doanh"
        elif '/khoa-hoc/' in url:
            return "Khoa học"
        elif '/suc-khoe/' in url:
            return "Sức khỏe"
        elif '/du-lich/' in url:
            return "Du lịch"
        else:
            return "Tin tức"
    
    def scrape_article_content(self, article_url):
        """Scrape nội dung chi tiết của bài báo"""
        response = self.make_request(article_url)
        if not response:
            return ""
        
        soup = self.parse_html(response.content)
        
        # Extract content paragraphs
        content_elements = soup.select('.fck_detail p')
        content_parts = []
        
        for p in content_elements:
            text = self.extract_text(p)
            if text and len(text) > 20:  # Ignore short paragraphs
                content_parts.append(text)
        
        return "\n\n".join(content_parts)
    
    def scrape_detailed_articles(self, max_articles=5):
        """Scrape nội dung chi tiết cho các bài báo"""
        self.logger.info(f"📚 Scraping detailed content for {max_articles} articles...")
        
        for i, article in enumerate(self.articles[:max_articles]):
            self.logger.info(f"📖 Scraping content for: {article.title[:50]}...")
            
            content = self.scrape_article_content(article.url)
            article.content = content
            
            # Extract tags từ content
            article.tags = self.extract_tags_from_content(content)
            
            if (i + 1) % 3 == 0:  # Progress update
                self.logger.info(f"⏳ Progress: {i + 1}/{max_articles} articles processed")
    
    def extract_tags_from_content(self, content):
        """Extract tags từ nội dung bài báo"""
        if not content:
            return []
        
        # Simple keyword extraction
        keywords = {
            'công nghệ': ['công nghệ', 'technology', 'AI', 'robot', 'smartphone'],
            'kinh tế': ['kinh tế', 'economy', 'GDP', 'đầu tư', 'chứng khoán'],
            'thể thao': ['bóng đá', 'tennis', 'Olympic', 'World Cup', 'thể thao'],
            'giải trí': ['phim', 'nhạc', 'ca sĩ', 'diễn viên', 'show'],
            'chính trị': ['chính phủ', 'quốc hội', 'tổng thống', 'bộ trưởng']
        }
        
        tags = []
        content_lower = content.lower()
        
        for category, words in keywords.items():
            for word in words:
                if word.lower() in content_lower:
                    if category not in tags:
                        tags.append(category)
                    break
        
        return tags
    
    def get_articles_by_category(self, category):
        """Lấy articles theo category"""
        return [article for article in self.articles if article.category == category]
    
    def get_articles_by_date(self, date_str):
        """Lấy articles theo ngày"""
        return [article for article in self.articles if date_str in article.publish_date]
    
    def search_articles(self, keyword):
        """Tìm kiếm articles theo keyword"""
        keyword_lower = keyword.lower()
        results = []
        
        for article in self.articles:
            if (keyword_lower in article.title.lower() or
                keyword_lower in article.summary.lower() or
                keyword_lower in article.content.lower()):
                results.append(article)
        
        return results
    
    def generate_report(self):
        """Tạo báo cáo scraping"""
        if not self.articles:
            return "Không có dữ liệu để tạo báo cáo"
        
        # Category distribution
        categories = {}
        for article in self.articles:
            categories[article.category] = categories.get(article.category, 0) + 1
        
        # Tags distribution
        all_tags = []
        for article in self.articles:
            all_tags.extend(article.tags)
        
        tag_count = {}
        for tag in all_tags:
            tag_count[tag] = tag_count.get(tag, 0) + 1
        
        report = {
            'summary': {
                'total_articles': len(self.articles),
                'scraping_time': datetime.now().isoformat(),
                'categories': len(categories),
                'unique_tags': len(tag_count)
            },
            'category_distribution': categories,
            'top_tags': sorted(tag_count.items(), key=lambda x: x[1], reverse=True)[:10],
            'scraping_stats': self.get_statistics()
        }
        
        return report
    
    def export_data(self, format='json', filename=None):
        """Export dữ liệu ra file"""
        if not filename:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"news_data_{timestamp}"
        
        if format.lower() == 'json':
            # Convert dataclass to dict for JSON serialization
            articles_dict = []
            for article in self.articles:
                articles_dict.append({
                    'title': article.title,
                    'url': article.url,
                    'summary': article.summary,
                    'author': article.author,
                    'publish_date': article.publish_date,
                    'category': article.category,
                    'content': article.content[:500] + "..." if len(article.content) > 500 else article.content,
                    'tags': article.tags
                })
            
            self.save_to_json(articles_dict, f"{filename}.json")
            
        elif format.lower() == 'csv':
            # Convert to simple dict for CSV
            articles_dict = []
            for article in self.articles:
                articles_dict.append({
                    'title': article.title,
                    'url': article.url,
                    'summary': article.summary[:200] + "..." if len(article.summary) > 200 else article.summary,
                    'author': article.author,
                    'publish_date': article.publish_date,
                    'category': article.category,
                    'tags': ", ".join(article.tags)
                })
            
            self.save_to_csv(articles_dict, f"{filename}.csv")

# Demo News Scraper
def demo_news_scraper():
    """Demo News Scraper"""
    print("📰 DEMO NEWS SCRAPER")
    print("=" * 50)
    
    # Tạo scraper (demo với URL giả lập)
    scraper = NewsScraper("https://vnexpress.net")
    
    # Giả lập việc scrape (vì không thể thực sự scrape VnExpress)
    print("🔄 Đang scrape homepage...")
    
    # Tạo dữ liệu demo
    demo_articles = [
        NewsArticle(
            title="Công nghệ AI phát triển mạnh mẽ trong năm 2024",
            url="https://vnexpress.net/cong-nghe-ai-2024",
            summary="Trí tuệ nhân tạo tiếp tục có những bước tiến vượt bậc...",
            author="VnExpress",
            publish_date="15/03/2024",
            category="Công nghệ",
            content="Trong năm 2024, công nghệ AI đã có những bước tiến đáng kể. Các ứng dụng AI được tích hợp vào nhiều lĩnh vực khác nhau từ y tế, giáo dục đến kinh doanh. Đặc biệt, các mô hình ngôn ngữ lớn như GPT-4 đã cho thấy khả năng xử lý ngôn ngữ tự nhiên ấn tượng.",
            tags=["công nghệ", "AI", "2024"]
        ),
        NewsArticle(
            title="Thị trường chứng khoán Việt Nam tăng trưởng tích cực",
            url="https://vnexpress.net/chung-khoan-vn-tang-truong",
            summary="VN-Index đạt mức tăng trưởng ấn tượng trong quý đầu năm...",
            author="VnExpress",
            publish_date="14/03/2024",
            category="Kinh doanh",
            content="Thị trường chứng khoán Việt Nam ghi nhận sự tăng trưởng mạnh mẽ với VN-Index vượt mốc 1,200 điểm. Các nhà đầu tư trong nước và ngoại quốc đều tỏ ra lạc quan về triển vọng kinh tế.",
            tags=["kinh tế", "chứng khoán", "đầu tư"]
        ),
        NewsArticle(
            title="Đội tuyển bóng đá Việt Nam chuẩn bị cho World Cup 2026",
            url="https://vnexpress.net/dt-vn-world-cup-2026",
            summary="HLV Park Hang-seo đang xây dựng kế hoạch dài hạn...",
            author="VnExpress",
            publish_date="13/03/2024",
            category="Thể thao",
            content="Đội tuyển quốc gia Việt Nam đang tích cực chuẩn bị cho vòng loại World Cup 2026. Với sự dẫn dắt của HLV Park Hang-seo, đội tuyển đang được đầu tư mạnh mẽ về nhân sự và chiến thuật.",
            tags=["thể thao", "bóng đá", "World Cup"]
        )
    ]
    
    scraper.articles = demo_articles
    
    print(f"✅ Scraped {len(demo_articles)} articles")
    
    # Demo các tính năng
    print(f"\n🔍 TÍNH NĂNG SEARCH:")
    ai_articles = scraper.search_articles("AI")
    print(f"Found {len(ai_articles)} articles about AI:")
    for article in ai_articles:
        print(f"  📄 {article.title}")
    
    print(f"\n📊 BÁO CÁO:")
    report = scraper.generate_report()
    print(f"Tổng số bài: {report['summary']['total_articles']}")
    print(f"Phân bố danh mục:")
    for category, count in report['category_distribution'].items():
        print(f"  {category}: {count} bài")
    
    # Export data
    print(f"\n💾 EXPORT DATA:")
    scraper.export_data('json', 'demo_news')
    scraper.export_data('csv', 'demo_news')
    
    print(f"\n📈 THỐNG KÊ SCRAPING:")
    stats = scraper.get_statistics()
    for key, value in stats.items():
        print(f"  {key}: {value}")

# Chạy demo
demo_news_scraper()
```

### 3. E-commerce Scraper - Thu thập sản phẩm

```python
@dataclass
class Product:
    """Data class cho sản phẩm"""
    name: str
    price: float
    original_price: float
    discount_percent: float
    rating: float
    review_count: int
    url: str
    image_url: str
    description: str
    seller: str
    category: str
    in_stock: bool
    specifications: Dict[str, str] = None
    
    def __post_init__(self):
        if self.specifications is None:
            self.specifications = {}

class EcommerceScraper(WebScraper):
    """
    E-commerce Scraper cho các trang thương mại điện tử
    Giống như một shopping assistant thông minh!
    """
    
    def __init__(self, base_url, site_name="Generic"):
        super().__init__(base_url)
        self.site_name = site_name
        self.products = []
    
    def scrape_product_list(self, search_query, max_pages=3):
        """Scrape danh sách sản phẩm từ kết quả tìm kiếm"""
        self.logger.info(f"🛒 Scraping products for query: {search_query}")
        
        for page in range(1, max_pages + 1):
            self.logger.info(f"📄 Scraping page {page}...")
            
            # Construct search URL (tùy thuộc vào site)
            search_url = self.construct_search_url(search_query, page)
            
            response = self.make_request(search_url)
            if not response:
                continue
            
            soup = self.parse_html(response.content)
            
            # Extract products từ page
            products = self.extract_products_from_page(soup)
            self.products.extend(products)
            
            self.logger.info(f"✅ Scraped {len(products)} products from page {page}")
            
            # Check if there are more pages
            if not self.has_next_page(soup):
                break
    
    def construct_search_url(self, query, page):
        """Tạo URL tìm kiếm (cần customize cho từng site)"""
        # Demo URL format
        return f"{self.base_url}/search?q={query}&page={page}"
    
    def extract_products_from_page(self, soup):
        """Extract products từ một page (demo implementation)"""
        products = []
        
        # Demo selectors (cần thay đổi theo site thực tế)
        product_elements = soup.select('.product-item')
        
        for element in product_elements:
            try:
                product = self.extract_single_product(element)
                if product:
                    products.append(product)
            except Exception as e:
                self.logger.error(f"❌ Error extracting product: {e}")
                continue
        
        return products
    
    def extract_single_product(self, element):
        """Extract thông tin từ một product element"""
        # Demo extraction (cần customize cho từng site)
        try:
            name = self.extract_text(element.select_one('.product-name'))
            if not name:
                return None
            
            # Price extraction
            price_text = self.extract_text(element.select_one('.price'))
            price = self.parse_price(price_text)
            
            # Original price (nếu có discount)
            original_price_text = self.extract_text(element.select_one('.original-price'))
            original_price = self.parse_price(original_price_text) if original_price_text else price
            
            # Calculate discount
            discount_percent = ((original_price - price) / original_price * 100) if original_price > price else 0
            
            # Rating
            rating_element = element.select_one('.rating')
            rating = self.parse_rating(rating_element) if rating_element else 0
            
            # Review count
            review_text = self.extract_text(element.select_one('.review-count'))
            review_count = self.parse_review_count(review_text)
            
            # URL
            url_element = element.select_one('a[href]')
            url = self.get_absolute_url(url_element.get('href')) if url_element else ""
            
            # Image
            img_element = element.select_one('img')
            image_url = img_element.get('src') if img_element else ""
            
            product = Product(
                name=name,
                price=price,
                original_price=original_price,
                discount_percent=round(discount_percent, 2),
                rating=rating,
                review_count=review_count,
                url=url,
                image_url=image_url,
                description="",  # Sẽ scrape sau nếu cần
                seller=self.site_name,
                category="",
                in_stock=True  # Assume in stock if displayed
            )
            
            return product
            
        except Exception as e:
            self.logger.error(f"❌ Error extracting single product: {e}")
            return None
    
    def parse_price(self, price_text):
        """Parse price từ text"""
        if not price_text:
            return 0.0
        
        # Remove currency symbols and format
        import re
        numbers = re.findall(r'[\d,]+', price_text.replace('.', ','))
        if numbers:
            return float(numbers[0].replace(',', ''))
        return 0.0
    
    def parse_rating(self, rating_element):
        """Parse rating từ element"""
        # Try to extract from stars, data attributes, etc.
        rating_text = self.extract_text(rating_element)
        
        import re
        rating_match = re.search(r'(\d+\.?\d*)', rating_text)
        if rating_match:
            return float(rating_match.group(1))
        
        # Try star counting
        stars = rating_element.select('.star.filled, .star.active')
        if stars:
            return len(stars)
        
        return 0.0
    
    def parse_review_count(self, review_text):
        """Parse review count từ text"""
        if not review_text:
            return 0
        
        import re
        numbers = re.findall(r'\d+', review_text.replace(',', ''))
        if numbers:
            return int(numbers[0])
        return 0
    
    def has_next_page(self, soup):
        """Kiểm tra còn trang tiếp theo không"""
        # Look for pagination indicators
        next_button = soup.select_one('.next-page, .pagination .next')
        return next_button is not None and not next_button.get('disabled')
    
    def scrape_product_details(self, max_products=5):
        """Scrape chi tiết sản phẩm"""
        self.logger.info(f"🔍 Scraping details for {max_products} products...")
        
        for i, product in enumerate(self.products[:max_products]):
            if not product.url:
                continue
            
            self.logger.info(f"📦 Scraping details for: {product.name[:50]}...")
            
            response = self.make_request(product.url)
            if not response:
                continue
            
            soup = self.parse_html(response.content)
            
            # Extract detailed info
            product.description = self.extract_product_description(soup)
            product.specifications = self.extract_specifications(soup)
            product.category = self.extract_category(soup)
            
            if (i + 1) % 3 == 0:
                self.logger.info(f"⏳ Progress: {i + 1}/{max_products} products detailed")
    
    def extract_product_description(self, soup):
        """Extract mô tả sản phẩm"""
        desc_element = soup.select_one('.product-description, .description, .detail')
        return self.extract_text(desc_element) if desc_element else ""
    
    def extract_specifications(self, soup):
        """Extract thông số kỹ thuật"""
        specs = {}
        
        # Look for specification table
        spec_rows = soup.select('.spec-table tr, .specifications tr')
        
        for row in spec_rows:
            cells = row.select('td, th')
            if len(cells) >= 2:
                key = self.extract_text(cells[0])
                value = self.extract_text(cells[1])
                if key and value:
                    specs[key] = value
        
        return specs
    
    def extract_category(self, soup):
        """Extract danh mục sản phẩm"""
        # Look for breadcrumb
        breadcrumb = soup.select('.breadcrumb a, .category-path a')
        if breadcrumb and len(breadcrumb) > 1:
            return self.extract_text(breadcrumb[-1])
        
        return ""
    
    def filter_products(self, **filters):
        """Lọc sản phẩm theo điều kiện"""
        filtered = self.products.copy()
        
        if 'min_price' in filters:
            filtered = [p for p in filtered if p.price >= filters['min_price']]
        
        if 'max_price' in filters:
            filtered = [p for p in filtered if p.price <= filters['max_price']]
        
        if 'min_rating' in filters:
            filtered = [p for p in filtered if p.rating >= filters['min_rating']]
        
        if 'min_discount' in filters:
            filtered = [p for p in filtered if p.discount_percent >= filters['min_discount']]
        
        if 'category' in filters:
            filtered = [p for p in filtered if filters['category'].lower() in p.category.lower()]
        
        return filtered
    
    def sort_products(self, by='price', ascending=True):
        """Sắp xếp sản phẩm"""
        sort_key_map = {
            'price': lambda p: p.price,
            'rating': lambda p: p.rating,
            'discount': lambda p: p.discount_percent,
            'reviews': lambda p: p.review_count,
            'name': lambda p: p.name.lower()
        }
        
        if by in sort_key_map:
            return sorted(self.products, key=sort_key_map[by], reverse=not ascending)
        
        return self.products
    
    def get_price_analysis(self):
        """Phân tích giá cả"""
        if not self.products:
            return {}
        
        prices = [p.price for p in self.products if p.price > 0]
        
        if not prices:
            return {}
        
        return {
            'min_price': min(prices),
            'max_price': max(prices),
            'avg_price': sum(prices) / len(prices),
            'median_price': sorted(prices)[len(prices) // 2],
            'total_products': len(self.products),
            'price_ranges': self.get_price_ranges(prices)
        }
    
    def get_price_ranges(self, prices):
        """Phân tích phân bố giá"""
        max_price = max(prices)
        ranges = {
            'under_100k': 0,
            '100k_500k': 0,
            '500k_1m': 0,
            '1m_5m': 0,
            'over_5m': 0
        }
        
        for price in prices:
            if price < 100000:
                ranges['under_100k'] += 1
            elif price < 500000:
                ranges['100k_500k'] += 1
            elif price < 1000000:
                ranges['500k_1m'] += 1
            elif price < 5000000:
                ranges['1m_5m'] += 1
            else:
                ranges['over_5m'] += 1
        
        return ranges
    
    def generate_product_report(self):
        """Tạo báo cáo sản phẩm"""
        report = {
            'summary': {
                'total_products': len(self.products),
                'scraping_time': datetime.now().isoformat(),
                'site': self.site_name
            },
            'price_analysis': self.get_price_analysis(),
            'top_rated': sorted([p for p in self.products if p.rating > 0], 
                               key=lambda p: p.rating, reverse=True)[:5],
            'best_deals': sorted([p for p in self.products if p.discount_percent > 0], 
                                key=lambda p: p.discount_percent, reverse=True)[:5],
            'scraping_stats': self.get_statistics()
        }
        
        return report

# Demo E-commerce Scraper
def demo_ecommerce_scraper():
    """Demo E-commerce Scraper"""
    print("🛒 DEMO E-COMMERCE SCRAPER")
    print("=" * 50)
    
    # Tạo scraper
    scraper = EcommerceScraper("https://shopee.vn", "Shopee")
    
    # Tạo dữ liệu demo
    demo_products = [
        Product(
            name="iPhone 15 Pro Max 256GB",
            price=29990000,
            original_price=32990000,
            discount_percent=9.1,
            rating=4.8,
            review_count=1250,
            url="https://shopee.vn/iphone-15-pro-max",
            image_url="https://example.com/iphone15.jpg",
            description="iPhone 15 Pro Max mới nhất với chip A17 Pro",
            seller="Apple Store",
            category="Điện thoại",
            in_stock=True,
            specifications={
                "Màn hình": "6.7 inch Super Retina XDR",
                "Chip": "A17 Pro",
                "RAM": "8GB",
                "Bộ nhớ": "256GB"
            }
        ),
        Product(
            name="Samsung Galaxy S24 Ultra 512GB",
            price=28990000,
            original_price=31990000,
            discount_percent=9.4,
            rating=4.7,
            review_count=890,
            url="https://shopee.vn/samsung-s24-ultra",
            image_url="https://example.com/s24ultra.jpg",
            description="Samsung Galaxy S24 Ultra với S Pen tích hợp",
            seller="Samsung Store",
            category="Điện thoại",
            in_stock=True,
            specifications={
                "Màn hình": "6.8 inch Dynamic AMOLED",
                "Chip": "Snapdragon 8 Gen 3",
                "RAM": "12GB",
                "Bộ nhớ": "512GB"
            }
        ),
        Product(
            name="MacBook Air M3 13 inch 256GB",
            price=27990000,
            original_price=29990000,
            discount_percent=6.7,
            rating=4.9,
            review_count=456,
            url="https://shopee.vn/macbook-air-m3",
            image_url="https://example.com/macbook-air.jpg",
            description="MacBook Air M3 siêu mỏng, hiệu năng cao",
            seller="Apple Store",
            category="Laptop",
            in_stock=True,
            specifications={
                "Màn hình": "13.6 inch Liquid Retina",
                "Chip": "Apple M3",
                "RAM": "8GB",
                "SSD": "256GB"
            }
        )
    ]
    
    scraper.products = demo_products
    
    print(f"✅ Loaded {len(demo_products)} demo products")
    
    # Demo filtering
    print(f"\n🔍 LỌC SẢN PHẨM:")
    expensive_products = scraper.filter_products(min_price=25000000)
    print(f"Sản phẩm trên 25 triệu: {len(expensive_products)}")
    
    high_rated = scraper.filter_products(min_rating=4.8)
    print(f"Sản phẩm rating >= 4.8: {len(high_rated)}")
    
    # Demo sorting
    print(f"\n📊 SẮP XẾP:")
    by_price = scraper.sort_products(by='price', ascending=False)
    print("Sắp xếp theo giá (cao → thấp):")
    for product in by_price:
        print(f"  💰 {product.name}: {product.price:,.0f}đ")
    
    # Price analysis
    print(f"\n💹 PHÂN TÍCH GIÁ:")
    analysis = scraper.get_price_analysis()
    print(f"Giá thấp nhất: {analysis['min_price']:,.0f}đ")
    print(f"Giá cao nhất: {analysis['max_price']:,.0f}đ")
    print(f"Giá trung bình: {analysis['avg_price']:,.0f}đ")
    
    # Generate report
    print(f"\n📋 BÁO CÁO:")
    report = scraper.generate_product_report()
    print(f"Tổng sản phẩm: {report['summary']['total_products']}")
    print(f"Top rated products:")
    for product in report['top_rated']:
        print(f"  ⭐ {product.name}: {product.rating}/5")

# Chạy demo
demo_ecommerce_scraper()
```

### 4. Scheduler và Automation

```python
import schedule
import threading
from datetime import datetime, timedelta

class ScrapingScheduler:
    """
    Scheduler để tự động chạy scraping tasks
    Giống như một trợ lý cá nhân tự động!
    """
    
    def __init__(self):
        self.jobs = []
        self.is_running = False
        self.scheduler_thread = None
        self.logger = logging.getLogger(__name__)
    
    def add_daily_job(self, scraper_func, time_str, *args, **kwargs):
        """Thêm job chạy hàng ngày"""
        job = schedule.every().day.at(time_str).do(scraper_func, *args, **kwargs)
        self.jobs.append(job)
        self.logger.info(f"📅 Added daily job at {time_str}")
        return job
    
    def add_hourly_job(self, scraper_func, *args, **kwargs):
        """Thêm job chạy hàng giờ"""
        job = schedule.every().hour.do(scraper_func, *args, **kwargs)
        self.jobs.append(job)
        self.logger.info(f"⏰ Added hourly job")
        return job
    
    def add_interval_job(self, scraper_func, minutes, *args, **kwargs):
        """Thêm job chạy theo interval"""
        job = schedule.every(minutes).minutes.do(scraper_func, *args, **kwargs)
        self.jobs.append(job)
        self.logger.info(f"⏲️ Added job every {minutes} minutes")
        return job
    
    def start_scheduler(self):
        """Bắt đầu scheduler"""
        if self.is_running:
            self.logger.warning("⚠️ Scheduler is already running")
            return
        
        self.is_running = True
        self.scheduler_thread = threading.Thread(target=self._run_scheduler, daemon=True)
        self.scheduler_thread.start()
        self.logger.info("🚀 Scheduler started")
    
    def stop_scheduler(self):
        """Dừng scheduler"""
        self.is_running = False
        if self.scheduler_thread:
            self.scheduler_thread.join()
        self.logger.info("⏹️ Scheduler stopped")
    
    def _run_scheduler(self):
        """Chạy scheduler loop"""
        while self.is_running:
            schedule.run_pending()
            time.sleep(1)
    
    def get_job_status(self):
        """Lấy trạng thái các jobs"""
        status = []
        for job in self.jobs:
            status.append({
                'job': str(job.job_func),
                'next_run': job.next_run,
                'interval': str(job.interval)
            })
        return status

class AutoScraper:
    """
    Hệ thống scraping tự động với scheduler
    """
    
    def __init__(self):
        self.scheduler = ScrapingScheduler()
        self.scrapers = {}
        self.results_dir = "scraping_results"
        
        # Tạo thư mục results
        import os
        os.makedirs(self.results_dir, exist_ok=True)
    
    def register_scraper(self, name, scraper):
        """Đăng ký scraper"""
        self.scrapers[name] = scraper
        print(f"✅ Registered scraper: {name}")
    
    def schedule_news_scraping(self, time_str="09:00"):
        """Lập lịch scrape news hàng ngày"""
        def news_job():
            print(f"\n📰 [{datetime.now()}] Starting scheduled news scraping...")
            
            if 'news' in self.scrapers:
                scraper = self.scrapers['news']
                scraper.scrape_vnexpress_homepage()
                
                # Export results
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"news_{timestamp}"
                scraper.export_data('json', f"{self.results_dir}/{filename}")
                
                print(f"✅ News scraping completed: {len(scraper.articles)} articles")
            else:
                print("❌ No news scraper registered")
        
        self.scheduler.add_daily_job(news_job, time_str)
    
    def schedule_product_monitoring(self, search_query, interval_minutes=60):
        """Lập lịch monitor sản phẩm"""
        def product_job():
            print(f"\n🛒 [{datetime.now()}] Starting product monitoring for: {search_query}")
            
            if 'ecommerce' in self.scrapers:
                scraper = self.scrapers['ecommerce']
                scraper.scrape_product_list(search_query, max_pages=2)
                
                # Export results
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"products_{search_query}_{timestamp}"
                
                # Save as JSON with price history
                products_data = []
                for product in scraper.products:
                    products_data.append({
                        'name': product.name,
                        'price': product.price,
                        'original_price': product.original_price,
                        'discount_percent': product.discount_percent,
                        'rating': product.rating,
                        'url': product.url,
                        'scraped_at': datetime.now().isoformat()
                    })
                
                scraper.save_to_json(products_data, f"{self.results_dir}/{filename}.json")
                
                print(f"✅ Product monitoring completed: {len(scraper.products)} products")
            else:
                print("❌ No e-commerce scraper registered")
        
        self.scheduler.add_interval_job(product_job, interval_minutes)
    
    def start_auto_scraping(self):
        """Bắt đầu auto scraping"""
        print("🤖 STARTING AUTO SCRAPING SYSTEM")
        print("=" * 40)
        
        self.scheduler.start_scheduler()
        
        # Show scheduled jobs
        jobs = self.scheduler.get_job_status()
        print(f"📋 Scheduled Jobs ({len(jobs)}):")
        for i, job in enumerate(jobs, 1):
            print(f"  {i}. {job['job']} - Next run: {job['next_run']}")
    
    def stop_auto_scraping(self):
        """Dừng auto scraping"""
        self.scheduler.stop_scheduler()
        print("⏹️ Auto scraping stopped")

# Demo Auto Scraper
def demo_auto_scraper():
    """Demo Auto Scraping System"""
    print("🤖 DEMO AUTO SCRAPING SYSTEM")
    print("=" * 50)
    
    # Tạo auto scraper
    auto_scraper = AutoScraper()
    
    # Tạo và đăng ký scrapers
    news_scraper = NewsScraper("https://vnexpress.net")
    ecommerce_scraper = EcommerceScraper("https://shopee.vn", "Shopee")
    
    auto_scraper.register_scraper('news', news_scraper)
    auto_scraper.register_scraper('ecommerce', ecommerce_scraper)
    
    # Lập lịch jobs
    print("\n📅 SCHEDULING JOBS:")
    auto_scraper.schedule_news_scraping("10:00")  # Scrape news at 10:00 AM daily
    auto_scraper.schedule_product_monitoring("smartphone", 30)  # Monitor phones every 30 min
    
    # Start system
    auto_scraper.start_auto_scraping()
    
    print("\n⏰ System is running... (Press Ctrl+C to stop)")
    
    try:
        # Simulate running for a short time
        time.sleep(10)
        print("\n📊 System running normally...")
        time.sleep(5)
    except KeyboardInterrupt:
        pass
    finally:
        auto_scraper.stop_auto_scraping()

# Run demo (comment out to avoid actually running scheduler)
# demo_auto_scraper()
```

## 🎯 Tóm tắt dự án

### 🏆 Tính năng đã triển khai:

1. **🔧 Base WebScraper Class**
   - Request handling với retry logic
   - Random delays và User-Agent rotation
   - Error handling và logging
   - Statistics tracking

2. **📰 News Scraper**
   - Thu thập tin tức từ trang chủ
   - Extract nội dung chi tiết
   - Phân loại và tag articles
   - Search và filter functionality

3. **🛒 E-commerce Scraper**
   - Thu thập thông tin sản phẩm
   - Price monitoring và analysis
   - Product filtering và sorting
   - Detailed product information

4. **🤖 Auto Scraping System**
   - Scheduled scraping jobs
   - Multi-scraper management
   - Automatic data export
   - Monitoring và reporting

### 📚 Kiến thức đã sử dụng:

- **Web Technologies**: HTTP requests, HTML parsing, CSS selectors
- **Data Processing**: BeautifulSoup, pandas, JSON/CSV handling
- **OOP Design**: Classes, inheritance, dataclasses
- **Concurrency**: Threading, scheduling
- **Error Handling**: Try/except, retry logic
- **Logging**: Structured logging system
- **File I/O**: Reading/writing various formats

:::tip Lưu ý quan trọng về Web Scraping:
1. **Respect robots.txt** - Kiểm tra file robots.txt của website
2. **Rate limiting** - Không spam requests quá nhanh
3. **Legal compliance** - Tuân thủ Terms of Service
4. **Ethical scraping** - Chỉ scrape dữ liệu công khai cần thiết
5. **Use APIs when available** - API thường tốt hơn scraping
:::

**Bước tiếp theo**: Thử tạo các dự án khác để áp dụng những kiến thức đã học!

---
*💡 Tip: Web Scraping là một kỹ năng mạnh mẽ, nhưng hãy sử dụng có trách nhiệm!*

---
**Behitek - Học lập trình Python một cách dễ hiểu nhất! 🚀**
