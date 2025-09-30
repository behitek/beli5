# 📊 Phân Tích Dữ Liệu với Python - Data Analysis

> **Tóm tắt**: Hướng dẫn toàn diện về phân tích dữ liệu với Python, từ cơ bản đến nâng cao, bao gồm pandas, NumPy, matplotlib và các thư viện quan trọng khác.

## 🎯 Tại Sao Cần Phân Tích Dữ Liệu?

Hãy tưởng tượng bạn là một thám tử 🕵️‍♂️, và dữ liệu là những manh mối. Phân tích dữ liệu giúp bạn:

- **Khám phá patterns** - Tìm ra quy luật ẩn
- **Đưa ra quyết định** - Dựa trên evidence thay vì cảm tính
- **Predict tương lai** - Dự đoán xu hướng
- **Tối ưu performance** - Cải thiện hiệu quả

Python là công cụ tuyệt vời cho data analysis vì có ecosystem phong phú và syntax đơn giản!

---

## 📦 1. ESSENTIAL LIBRARIES

### Cài Đặt Môi Trường
```bash
# Essential data science packages
pip install pandas numpy matplotlib seaborn scipy
pip install jupyter plotly scikit-learn

# Optional advanced packages  
pip install statsmodels openpyxl xlsxwriter requests beautifulsoup4
```

### Import Statement Standards
```python
# Standard imports for data analysis
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import warnings
warnings.filterwarnings('ignore')

# Set display options
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', 50)

# Plotting style
plt.style.use('seaborn-v0_8')
sns.set_palette("husl")

print("Đã import thành công các thư viện cần thiết!")
```

---

## 🐼 2. PANDAS ESSENTIALS

### DataFrame Basics
```python
# Tạo DataFrame từ các nguồn khác nhau
def create_sample_data():
    """Tạo dữ liệu mẫu về học sinh."""
    
    # Từ dictionary
    student_data = {
        'student_id': ['SV001', 'SV002', 'SV003', 'SV004', 'SV005'],
        'name': ['Nguyễn Văn An', 'Trần Thị Bình', 'Lê Hoàng Cường', 
                'Phạm Thị Dung', 'Hoàng Văn Em'],
        'age': [20, 19, 21, 20, 22],
        'gender': ['M', 'F', 'M', 'F', 'M'],
        'department': ['IT', 'Business', 'IT', 'Engineering', 'Business'],
        'gpa': [8.5, 9.2, 7.8, 8.9, 7.5],
        'credits': [45, 52, 38, 48, 41]
    }
    
    df = pd.DataFrame(student_data)
    
    # Thêm thông tin dates
    df['enrollment_date'] = pd.date_range('2020-09-01', periods=5, freq='30D')
    
    return df

# Tạo và khám phá DataFrame
students_df = create_sample_data()

print("=== BASIC INFO ===")
print(f"Shape: {students_df.shape}")
print(f"Columns: {list(students_df.columns)}")
print("\n=== FIRST 3 ROWS ===")
print(students_df.head(3))

print("\n=== DATA TYPES ===")
print(students_df.dtypes)

print("\n=== BASIC STATISTICS ===")
print(students_df.describe())
```

### Data Loading & Saving
```python
def demonstrate_data_io():
    """Demo các cách load và save dữ liệu."""
    
    # 1. CSV Files
    # Save to CSV
    students_df.to_csv('students.csv', index=False, encoding='utf-8')
    
    # Load from CSV
    loaded_df = pd.read_csv('students.csv', encoding='utf-8')
    print("✅ CSV loaded successfully")
    
    # 2. Excel Files
    # Save to Excel với multiple sheets
    with pd.ExcelWriter('students_data.xlsx', engine='xlsxwriter') as writer:
        students_df.to_excel(writer, sheet_name='Students', index=False)
        
        # Tạo summary sheet
        summary = students_df.groupby('department').agg({
            'gpa': ['mean', 'max', 'min'],
            'age': 'mean',
            'credits': 'sum'
        }).round(2)
        summary.to_excel(writer, sheet_name='Summary')
    
    # Load from Excel
    excel_df = pd.read_excel('students_data.xlsx', sheet_name='Students')
    print("✅ Excel loaded successfully")
    
    # 3. JSON Files
    # Save to JSON
    students_df.to_json('students.json', orient='records', indent=2)
    
    # Load from JSON
    json_df = pd.read_json('students.json')
    print("✅ JSON loaded successfully")
    
    # Cleanup files
    import os
    for file in ['students.csv', 'students_data.xlsx', 'students.json']:
        if os.path.exists(file):
            os.remove(file)

# demonstrate_data_io()
```

### Data Selection & Filtering
```python
def data_selection_examples():
    """Các cách select và filter dữ liệu."""
    
    df = create_sample_data()
    
    print("=== COLUMN SELECTION ===")
    # Single column
    names = df['name']
    print(f"Names: {names.tolist()}")
    
    # Multiple columns
    basic_info = df[['name', 'department', 'gpa']]
    print("\nBasic info:")
    print(basic_info)
    
    print("\n=== ROW FILTERING ===")
    # Conditional filtering
    high_gpa = df[df['gpa'] >= 8.5]
    print("Students with GPA >= 8.5:")
    print(high_gpa[['name', 'gpa']])
    
    # Multiple conditions
    it_students = df[(df['department'] == 'IT') & (df['age'] >= 20)]
    print("\nIT students aged 20+:")
    print(it_students[['name', 'age', 'department']])
    
    # Using isin()
    target_depts = ['IT', 'Engineering']
    tech_students = df[df['department'].isin(target_depts)]
    print(f"\nStudents in {target_depts}:")
    print(tech_students[['name', 'department']])
    
    print("\n=== STRING FILTERING ===")
    # String contains
    students_with_nguyen = df[df['name'].str.contains('Nguyễn')]
    print("Students with 'Nguyễn' in name:")
    print(students_with_nguyen[['name']])
    
    # String startswith
    female_students = df[df['name'].str.contains('Thị')]
    print("\nFemale students (có 'Thị'):")
    print(female_students[['name', 'gender']])

# data_selection_examples()
```

### Data Cleaning
```python
def data_cleaning_examples():
    """Các kỹ thuật data cleaning."""
    
    # Tạo messy data
    messy_data = {
        'student_id': ['SV001', 'SV002', None, 'SV004', 'SV005', 'SV002'],  # Duplicate và missing
        'name': ['  NGUYỄN VĂN AN  ', 'trần thị bình', 'LÊ HOÀNG cường', None, 'Phạm Thị Dung', '  NGUYỄN VĂN AN  '],
        'age': [20, 19, '21', 'invalid', 22, 20],  # Mixed types
        'email': ['an@email.com', 'BINH@EMAIL.COM', 'cuong@email', '', 'dung@email.com', 'an@email.com'],
        'score': [85.5, 92.0, None, 78.5, None, 85.5]
    }
    
    messy_df = pd.DataFrame(messy_data)
    
    print("=== ORIGINAL MESSY DATA ===")
    print(messy_df)
    print(f"Shape: {messy_df.shape}")
    
    # 1. Handle missing values
    print("\n=== MISSING VALUES ===")
    print("Missing values per column:")
    print(messy_df.isnull().sum())
    
    # Fill missing values
    cleaned_df = messy_df.copy()
    
    # Fill missing student_id with generated IDs
    missing_ids = cleaned_df['student_id'].isnull()
    cleaned_df.loc[missing_ids, 'student_id'] = 'SV003'
    
    # Fill missing names
    cleaned_df['name'].fillna('Unknown Student', inplace=True)
    
    # Fill missing scores with median
    median_score = pd.to_numeric(cleaned_df['score'], errors='coerce').median()
    cleaned_df['score'].fillna(median_score, inplace=True)
    
    print(f"Median score: {median_score}")
    
    # 2. Clean string data
    print("\n=== STRING CLEANING ===")
    # Strip whitespace và standardize case
    cleaned_df['name'] = cleaned_df['name'].str.strip().str.title()
    cleaned_df['email'] = cleaned_df['email'].str.strip().str.lower()
    
    # Handle invalid emails
    valid_email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    invalid_emails = ~cleaned_df['email'].str.match(valid_email_pattern, na=False)
    cleaned_df.loc[invalid_emails, 'email'] = None
    
    print("After email cleaning:")
    print(cleaned_df['email'].value_counts(dropna=False))
    
    # 3. Fix data types
    print("\n=== DATA TYPE CONVERSION ===")
    # Convert age to numeric, replacing invalid values with NaN
    cleaned_df['age'] = pd.to_numeric(cleaned_df['age'], errors='coerce')
    
    # Fill invalid ages with median
    median_age = cleaned_df['age'].median()
    cleaned_df['age'].fillna(median_age, inplace=True)
    cleaned_df['age'] = cleaned_df['age'].astype(int)
    
    # Convert score to numeric
    cleaned_df['score'] = pd.to_numeric(cleaned_df['score'], errors='coerce')
    
    print("Data types after conversion:")
    print(cleaned_df.dtypes)
    
    # 4. Remove duplicates
    print("\n=== DUPLICATE REMOVAL ===")
    print(f"Duplicates found: {cleaned_df.duplicated().sum()}")
    
    # Remove duplicates based on student_id
    cleaned_df = cleaned_df.drop_duplicates(subset=['student_id'], keep='first')
    
    print("=== FINAL CLEANED DATA ===")
    print(cleaned_df)
    print(f"Final shape: {cleaned_df.shape}")
    
    return cleaned_df

# cleaned_data = data_cleaning_examples()
```

---

## 📊 3. DATA ANALYSIS TECHNIQUES

### Descriptive Statistics
```python
def descriptive_analysis():
    """Phân tích thống kê mô tả."""
    
    df = create_sample_data()
    
    print("=== BASIC STATISTICS ===")
    # Central tendency
    gpa_stats = {
        'Mean (Trung bình)': df['gpa'].mean(),
        'Median (Trung vị)': df['gpa'].median(),
        'Mode (Yếu vị)': df['gpa'].mode().iloc[0] if not df['gpa'].mode().empty else 'No mode',
        'Standard Deviation (Độ lệch chuẩn)': df['gpa'].std(),
        'Variance (Phương sai)': df['gpa'].var()
    }
    
    for stat, value in gpa_stats.items():
        print(f"{stat}: {value:.2f}" if isinstance(value, (int, float)) else f"{stat}: {value}")
    
    print("\n=== QUANTILES ===")
    quantiles = df['gpa'].quantile([0.25, 0.5, 0.75])
    print(f"Q1 (25%): {quantiles[0.25]:.2f}")
    print(f"Q2 (50%): {quantiles[0.5]:.2f}")
    print(f"Q3 (75%): {quantiles[0.75]:.2f}")
    print(f"IQR: {quantiles[0.75] - quantiles[0.25]:.2f}")
    
    print("\n=== DISTRIBUTION ANALYSIS ===")
    # Skewness và Kurtosis
    from scipy.stats import skew, kurtosis
    print(f"Skewness (Độ lệch): {skew(df['gpa']):.3f}")
    print(f"Kurtosis (Độ nhọn): {kurtosis(df['gpa']):.3f}")
    
    print("\n=== CORRELATION ANALYSIS ===")
    # Correlation matrix cho numeric columns
    numeric_cols = ['age', 'gpa', 'credits']
    correlation_matrix = df[numeric_cols].corr()
    print("Correlation Matrix:")
    print(correlation_matrix.round(3))

# descriptive_analysis()
```

### Group Analysis
```python
def group_analysis():
    """Phân tích theo nhóm (GroupBy)."""
    
    # Tạo dataset lớn hơn
    np.random.seed(42)
    departments = ['IT', 'Business', 'Engineering', 'Science', 'Arts']
    genders = ['M', 'F']
    
    large_data = []
    for i in range(100):
        student = {
            'student_id': f'SV{i+1:03d}',
            'name': f'Student {i+1}',
            'department': np.random.choice(departments),
            'gender': np.random.choice(genders),
            'age': np.random.randint(18, 25),
            'gpa': np.random.normal(7.5, 1.5),  # Normal distribution
            'credits': np.random.randint(30, 60),
            'semester': np.random.choice(['Fall', 'Spring', 'Summer'])
        }
        # Ensure GPA is in valid range
        student['gpa'] = max(0, min(10, student['gpa']))
        large_data.append(student)
    
    df = pd.DataFrame(large_data)
    
    print("=== GROUP BY DEPARTMENT ===")
    dept_summary = df.groupby('department').agg({
        'gpa': ['mean', 'std', 'min', 'max', 'count'],
        'age': 'mean',
        'credits': 'sum'
    }).round(2)
    print(dept_summary)
    
    print("\n=== GROUP BY MULTIPLE COLUMNS ===")
    gender_dept_summary = df.groupby(['department', 'gender']).agg({
        'gpa': 'mean',
        'student_id': 'count'  # Count students
    }).round(2)
    gender_dept_summary.columns = ['avg_gpa', 'student_count']
    print(gender_dept_summary)
    
    print("\n=== ADVANCED GROUPBY ===")
    # Custom aggregation functions
    def gpa_range(series):
        return series.max() - series.min()
    
    def top_performer_count(series):
        return (series >= 8.5).sum()
    
    advanced_summary = df.groupby('department').agg({
        'gpa': ['mean', gpa_range, top_performer_count],
        'age': lambda x: x.mode().iloc[0]  # Most common age
    }).round(2)
    
    print("Advanced aggregations:")
    print(advanced_summary)
    
    print("\n=== PIVOT TABLES ===")
    # Pivot table - Excel-like functionality
    pivot_table = pd.pivot_table(
        df, 
        values='gpa', 
        index='department', 
        columns='gender',
        aggfunc=['mean', 'count'],
        fill_value=0
    ).round(2)
    
    print("Pivot table - GPA by Department and Gender:")
    print(pivot_table)
    
    return df

# large_df = group_analysis()
```

### Time Series Analysis Basics
```python
def time_series_basics():
    """Cơ bản về time series analysis."""
    
    # Tạo time series data
    dates = pd.date_range('2023-01-01', periods=365, freq='D')
    np.random.seed(42)
    
    # Simulate student enrollment over time
    base_enrollment = 100
    trend = np.linspace(0, 50, 365)  # Increasing trend
    seasonal = 20 * np.sin(2 * np.pi * np.arange(365) / 365)  # Yearly seasonality
    noise = np.random.normal(0, 10, 365)
    
    enrollment = base_enrollment + trend + seasonal + noise
    
    ts_df = pd.DataFrame({
        'date': dates,
        'enrollment': enrollment
    })
    ts_df.set_index('date', inplace=True)
    
    print("=== TIME SERIES OVERVIEW ===")
    print(f"Date range: {ts_df.index.min()} to {ts_df.index.max()}")
    print(f"Total records: {len(ts_df)}")
    print("\nFirst 5 records:")
    print(ts_df.head())
    
    print("\n=== RESAMPLING ===")
    # Monthly aggregation
    monthly_enrollment = ts_df.resample('M').agg({
        'enrollment': ['mean', 'sum', 'std']
    }).round(2)
    print("Monthly aggregation:")
    print(monthly_enrollment.head())
    
    # Weekly aggregation
    weekly_enrollment = ts_df.resample('W').mean().round(2)
    print("\nWeekly average enrollment:")
    print(weekly_enrollment.head())
    
    print("\n=== ROLLING STATISTICS ===")
    # Moving averages
    ts_df['ma_7'] = ts_df['enrollment'].rolling(window=7).mean()
    ts_df['ma_30'] = ts_df['enrollment'].rolling(window=30).mean()
    
    print("With moving averages:")
    print(ts_df.head(10))
    
    print("\n=== SEASONAL DECOMPOSITION ===")
    # Basic seasonal pattern detection
    ts_df['month'] = ts_df.index.month
    monthly_pattern = ts_df.groupby('month')['enrollment'].mean()
    
    print("Average enrollment by month:")
    for month, avg_enrollment in monthly_pattern.items():
        month_name = pd.Timestamp(f'2023-{month:02d}-01').strftime('%B')
        print(f"{month_name}: {avg_enrollment:.1f}")
    
    return ts_df

# ts_data = time_series_basics()
```

---

## 📈 4. DATA VISUALIZATION

### Matplotlib Fundamentals
```python
def matplotlib_examples():
    """Các loại chart cơ bản với matplotlib."""
    
    df = create_sample_data()
    
    # Setup subplots
    fig, axes = plt.subplots(2, 2, figsize=(15, 10))
    fig.suptitle('Student Data Visualization', fontsize=16, fontweight='bold')
    
    # 1. Bar Chart - GPA by Department
    dept_gpa = df.groupby('department')['gpa'].mean().sort_values(ascending=False)
    axes[0, 0].bar(dept_gpa.index, dept_gpa.values, color='skyblue', edgecolor='navy')
    axes[0, 0].set_title('Average GPA by Department')
    axes[0, 0].set_ylabel('GPA')
    axes[0, 0].tick_params(axis='x', rotation=45)
    
    # Add value labels on bars
    for i, v in enumerate(dept_gpa.values):
        axes[0, 0].text(i, v + 0.1, f'{v:.2f}', ha='center', va='bottom')
    
    # 2. Histogram - Age Distribution
    axes[0, 1].hist(df['age'], bins=5, color='lightgreen', edgecolor='darkgreen', alpha=0.7)
    axes[0, 1].set_title('Age Distribution')
    axes[0, 1].set_xlabel('Age')
    axes[0, 1].set_ylabel('Frequency')
    axes[0, 1].grid(True, alpha=0.3)
    
    # 3. Scatter Plot - GPA vs Credits
    colors = ['red' if gender == 'M' else 'blue' for gender in df['gender']]
    axes[1, 0].scatter(df['credits'], df['gpa'], c=colors, alpha=0.7, s=100)
    axes[1, 0].set_title('GPA vs Credits (Red=Male, Blue=Female)')
    axes[1, 0].set_xlabel('Credits')
    axes[1, 0].set_ylabel('GPA')
    axes[1, 0].grid(True, alpha=0.3)
    
    # Add correlation coefficient
    correlation = df['credits'].corr(df['gpa'])
    axes[1, 0].text(0.05, 0.95, f'Correlation: {correlation:.3f}', 
                   transform=axes[1, 0].transAxes, fontsize=10,
                   bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))
    
    # 4. Pie Chart - Gender Distribution
    gender_counts = df['gender'].value_counts()
    gender_labels = ['Nam' if g == 'M' else 'Nữ' for g in gender_counts.index]
    colors_pie = ['lightblue', 'lightpink']
    
    wedges, texts, autotexts = axes[1, 1].pie(gender_counts.values, labels=gender_labels, 
                                             colors=colors_pie, autopct='%1.1f%%', startangle=90)
    axes[1, 1].set_title('Gender Distribution')
    
    # Improve text appearance
    for autotext in autotexts:
        autotext.set_color('black')
        autotext.set_fontweight('bold')
    
    plt.tight_layout()
    plt.show()

# matplotlib_examples()
```

### Seaborn Advanced Visualizations
```python
def seaborn_examples():
    """Advanced visualizations với Seaborn."""
    
    # Tạo larger dataset
    large_df = group_analysis()  # Reuse từ function trước
    
    # Setup style
    plt.style.use('default')
    sns.set_palette("husl")
    
    # Create figure với multiple subplots
    fig = plt.figure(figsize=(20, 15))
    
    # 1. Distribution Plot
    plt.subplot(3, 3, 1)
    sns.histplot(data=large_df, x='gpa', hue='gender', multiple='dodge', bins=20)
    plt.title('GPA Distribution by Gender')
    
    # 2. Box Plot
    plt.subplot(3, 3, 2)
    sns.boxplot(data=large_df, x='department', y='gpa')
    plt.title('GPA Distribution by Department')
    plt.xticks(rotation=45)
    
    # 3. Violin Plot
    plt.subplot(3, 3, 3)
    sns.violinplot(data=large_df, x='semester', y='gpa', hue='gender')
    plt.title('GPA by Semester and Gender')
    
    # 4. Correlation Heatmap
    plt.subplot(3, 3, 4)
    numeric_cols = ['age', 'gpa', 'credits']
    correlation_matrix = large_df[numeric_cols].corr()
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0,
                square=True, fmt='.3f')
    plt.title('Correlation Heatmap')
    
    # 5. Pair Plot (trong subplot riêng)
    plt.subplot(3, 3, 5)
    # Scatter plot matrix-like
    sns.scatterplot(data=large_df, x='age', y='gpa', hue='department', s=60)
    plt.title('Age vs GPA by Department')
    
    # 6. Count Plot
    plt.subplot(3, 3, 6)
    sns.countplot(data=large_df, x='department', hue='gender')
    plt.title('Student Count by Department and Gender')
    plt.xticks(rotation=45)
    
    # 7. Strip Plot
    plt.subplot(3, 3, 7)
    sns.stripplot(data=large_df, x='department', y='credits', 
                  hue='gender', dodge=True, alpha=0.7)
    plt.title('Credits by Department and Gender')
    plt.xticks(rotation=45)
    
    # 8. Regression Plot
    plt.subplot(3, 3, 8)
    sns.regplot(data=large_df, x='credits', y='gpa', scatter_kws={'alpha':0.6})
    plt.title('GPA vs Credits (with regression line)')
    
    # 9. Categorical Plot
    plt.subplot(3, 3, 9)
    sns.barplot(data=large_df, x='department', y='gpa', hue='semester', 
                ci=95, capsize=0.05)
    plt.title('Average GPA by Department and Semester')
    plt.xticks(rotation=45)
    
    plt.tight_layout()
    plt.show()
    
    # Separate detailed pair plot
    print("Creating detailed pair plot...")
    numeric_data = large_df[['age', 'gpa', 'credits']].copy()
    pairplot = sns.pairplot(large_df, vars=['age', 'gpa', 'credits'], 
                           hue='department', diag_kind='hist', 
                           plot_kws={'alpha': 0.6})
    pairplot.fig.suptitle('Pair Plot of Numeric Variables', y=1.02)
    plt.show()

# seaborn_examples()
```

### Interactive Plotting với Plotly
```python
def plotly_examples():
    """Interactive visualizations với Plotly."""
    
    try:
        import plotly.graph_objects as go
        import plotly.express as px
        from plotly.subplots import make_subplots
        
        large_df = group_analysis()  # Reuse data
        
        print("Creating interactive Plotly visualizations...")
        
        # 1. Interactive Scatter Plot
        fig_scatter = px.scatter(
            large_df, 
            x='credits', 
            y='gpa',
            color='department',
            size='age',
            hover_data=['student_id', 'gender'],
            title='Interactive Scatter: GPA vs Credits by Department',
            labels={'credits': 'Total Credits', 'gpa': 'GPA'}
        )
        fig_scatter.update_layout(height=500)
        
        # 2. Interactive Bar Chart
        dept_summary = large_df.groupby(['department', 'gender']).agg({
            'gpa': 'mean',
            'student_id': 'count'
        }).round(2).reset_index()
        dept_summary.columns = ['department', 'gender', 'avg_gpa', 'count']
        
        fig_bar = px.bar(
            dept_summary,
            x='department',
            y='avg_gpa',
            color='gender',
            title='Average GPA by Department and Gender',
            hover_data=['count']
        )
        
        # 3. Interactive Line Chart (Time series simulation)
        # Create time series data
        dates = pd.date_range('2023-01-01', periods=52, freq='W')
        ts_data = []
        for dept in large_df['department'].unique():
            dept_students = len(large_df[large_df['department'] == dept])
            for i, date in enumerate(dates):
                # Simulate weekly enrollment with some trend
                base_count = dept_students / 10
                seasonal_factor = 1 + 0.3 * np.sin(2 * np.pi * i / 52)
                weekly_count = base_count * seasonal_factor + np.random.normal(0, 1)
                
                ts_data.append({
                    'date': date,
                    'department': dept,
                    'weekly_enrollment': max(0, weekly_count)
                })
        
        ts_df = pd.DataFrame(ts_data)
        
        fig_line = px.line(
            ts_df,
            x='date',
            y='weekly_enrollment',
            color='department',
            title='Weekly Enrollment Trends by Department',
            labels={'weekly_enrollment': 'Weekly Enrollment'}
        )
        
        # 4. 3D Scatter Plot
        fig_3d = px.scatter_3d(
            large_df,
            x='age',
            y='credits',
            z='gpa',
            color='department',
            size='gpa',
            hover_data=['student_id'],
            title='3D View: Age, Credits, and GPA'
        )
        
        # Display instructions
        print("Plotly figures created successfully!")
        print("To display in Jupyter notebook, use:")
        print("fig_scatter.show()")
        print("fig_bar.show()")
        print("fig_line.show()")
        print("fig_3d.show()")
        
        # Return figures for potential use
        return {
            'scatter': fig_scatter,
            'bar': fig_bar,
            'line': fig_line,
            '3d': fig_3d
        }
        
    except ImportError:
        print("Plotly not installed. Install with: pip install plotly")
        return None

# plotly_figs = plotly_examples()
```

---

## 🔍 5. ADVANCED ANALYSIS TECHNIQUES

### Statistical Tests
```python
def statistical_tests():
    """Các test thống kê cơ bản."""
    
    large_df = group_analysis()  # Reuse data
    
    print("=== NORMALITY TESTS ===")
    from scipy.stats import shapiro, normaltest, kstest
    
    # Test if GPA follows normal distribution
    gpa_data = large_df['gpa'].dropna()
    
    # Shapiro-Wilk test
    shapiro_stat, shapiro_p = shapiro(gpa_data)
    print(f"Shapiro-Wilk Test:")
    print(f"  Statistic: {shapiro_stat:.4f}")
    print(f"  P-value: {shapiro_p:.4f}")
    print(f"  Normal distribution: {'Yes' if shapiro_p > 0.05 else 'No'}")
    
    # D'Agostino's test
    dagostino_stat, dagostino_p = normaltest(gpa_data)
    print(f"\nD'Agostino's Test:")
    print(f"  Statistic: {dagostino_stat:.4f}")
    print(f"  P-value: {dagostino_p:.4f}")
    
    print("\n=== T-TESTS ===")
    from scipy.stats import ttest_ind, ttest_1samp
    
    # One-sample t-test: Is average GPA significantly different from 7.0?
    t_stat, t_p = ttest_1samp(gpa_data, 7.0)
    print(f"One-sample t-test (H0: mean GPA = 7.0):")
    print(f"  T-statistic: {t_stat:.4f}")
    print(f"  P-value: {t_p:.4f}")
    print(f"  Significant difference: {'Yes' if t_p < 0.05 else 'No'}")
    
    # Two-sample t-test: Compare GPA between genders
    male_gpa = large_df[large_df['gender'] == 'M']['gpa'].dropna()
    female_gpa = large_df[large_df['gender'] == 'F']['gpa'].dropna()
    
    t_stat, t_p = ttest_ind(male_gpa, female_gpa)
    print(f"\nTwo-sample t-test (Male vs Female GPA):")
    print(f"  Male GPA mean: {male_gpa.mean():.3f}")
    print(f"  Female GPA mean: {female_gpa.mean():.3f}")
    print(f"  T-statistic: {t_stat:.4f}")
    print(f"  P-value: {t_p:.4f}")
    print(f"  Significant difference: {'Yes' if t_p < 0.05 else 'No'}")
    
    print("\n=== ANOVA ===")
    from scipy.stats import f_oneway
    
    # One-way ANOVA: Compare GPA across departments
    dept_groups = [group['gpa'].dropna() for name, group in large_df.groupby('department')]
    f_stat, f_p = f_oneway(*dept_groups)
    
    print(f"One-way ANOVA (GPA across departments):")
    print(f"  F-statistic: {f_stat:.4f}")
    print(f"  P-value: {f_p:.4f}")
    print(f"  Significant difference: {'Yes' if f_p < 0.05 else 'No'}")
    
    # Post-hoc analysis if significant
    if f_p < 0.05:
        print("\n  Department means:")
        for dept, group in large_df.groupby('department'):
            mean_gpa = group['gpa'].mean()
            print(f"    {dept}: {mean_gpa:.3f}")
    
    print("\n=== CORRELATION TESTS ===")
    from scipy.stats import pearsonr, spearmanr
    
    # Pearson correlation
    pearson_r, pearson_p = pearsonr(large_df['credits'], large_df['gpa'])
    print(f"Pearson Correlation (Credits vs GPA):")
    print(f"  Correlation coefficient: {pearson_r:.4f}")
    print(f"  P-value: {pearson_p:.4f}")
    print(f"  Significant correlation: {'Yes' if pearson_p < 0.05 else 'No'}")
    
    # Spearman correlation (non-parametric)
    spearman_r, spearman_p = spearmanr(large_df['credits'], large_df['gpa'])
    print(f"\nSpearman Correlation (Credits vs GPA):")
    print(f"  Correlation coefficient: {spearman_r:.4f}")
    print(f"  P-value: {spearman_p:.4f}")

# statistical_tests()
```

### Linear Regression Analysis
```python
def regression_analysis():
    """Linear regression analysis."""
    
    try:
        from sklearn.linear_model import LinearRegression
        from sklearn.model_selection import train_test_split
        from sklearn.metrics import r2_score, mean_squared_error
        import statsmodels.api as sm
        
        large_df = group_analysis()  # Reuse data
        
        print("=== SIMPLE LINEAR REGRESSION ===")
        # Predict GPA based on credits
        X_simple = large_df[['credits']].values
        y = large_df['gpa'].values
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X_simple, y, test_size=0.2, random_state=42
        )
        
        # Fit model
        model_simple = LinearRegression()
        model_simple.fit(X_train, y_train)
        
        # Predictions
        y_pred = model_simple.predict(X_test)
        
        # Metrics
        r2 = r2_score(y_test, y_pred)
        mse = mean_squared_error(y_test, y_pred)
        
        print(f"Simple Regression (GPA ~ Credits):")
        print(f"  Coefficient: {model_simple.coef_[0]:.4f}")
        print(f"  Intercept: {model_simple.intercept_:.4f}")
        print(f"  R-squared: {r2:.4f}")
        print(f"  MSE: {mse:.4f}")
        print(f"  Equation: GPA = {model_simple.intercept_:.3f} + {model_simple.coef_[0]:.3f} * Credits")
        
        print("\n=== MULTIPLE LINEAR REGRESSION ===")
        # Encode categorical variables
        df_encoded = large_df.copy()
        df_encoded = pd.get_dummies(df_encoded, columns=['department', 'gender', 'semester'])
        
        # Select features
        feature_cols = ['age', 'credits'] + [col for col in df_encoded.columns if col.startswith(('department_', 'gender_'))]
        X_multiple = df_encoded[feature_cols].values
        
        # Split and fit
        X_train_mult, X_test_mult, y_train_mult, y_test_mult = train_test_split(
            X_multiple, y, test_size=0.2, random_state=42
        )
        
        model_multiple = LinearRegression()
        model_multiple.fit(X_train_mult, y_train_mult)
        
        # Predictions and metrics
        y_pred_mult = model_multiple.predict(X_test_mult)
        r2_mult = r2_score(y_test_mult, y_pred_mult)
        mse_mult = mean_squared_error(y_test_mult, y_pred_mult)
        
        print(f"Multiple Regression:")
        print(f"  R-squared: {r2_mult:.4f}")
        print(f"  MSE: {mse_mult:.4f}")
        print(f"  Improvement over simple: {((r2_mult - r2) / r2 * 100):.1f}%")
        
        # Feature importance
        print(f"\n  Feature Coefficients:")
        for i, feature in enumerate(feature_cols):
            print(f"    {feature}: {model_multiple.coef_[i]:.4f}")
        
        print("\n=== STATISTICAL SIGNIFICANCE (using statsmodels) ===")
        # Add constant for intercept
        X_with_const = sm.add_constant(X_multiple)
        
        # Fit OLS model
        ols_model = sm.OLS(y, X_with_const).fit()
        
        print("OLS Regression Results Summary:")
        print(f"  R-squared: {ols_model.rsquared:.4f}")
        print(f"  Adjusted R-squared: {ols_model.rsquared_adj:.4f}")
        print(f"  F-statistic: {ols_model.fvalue:.4f}")
        print(f"  F-statistic p-value: {ols_model.f_pvalue:.6f}")
        
        # Coefficient significance
        print(f"\n  Significant coefficients (p < 0.05):")
        for i, (feature, p_val) in enumerate(zip(['const'] + feature_cols, ols_model.pvalues)):
            if p_val < 0.05:
                coef = ols_model.params[i]
                print(f"    {feature}: {coef:.4f} (p = {p_val:.4f})")
        
        return {
            'simple_model': model_simple,
            'multiple_model': model_multiple,
            'ols_model': ols_model
        }
        
    except ImportError:
        print("scikit-learn or statsmodels not installed.")
        print("Install with: pip install scikit-learn statsmodels")
        return None

# regression_models = regression_analysis()
```

---

## 📊 6. REAL-WORLD PROJECT EXAMPLE

### Complete Data Analysis Pipeline
```python
def complete_data_analysis_project():
    """Một project hoàn chỉnh từ A-Z."""
    
    print("🎯 PROJECT: PHÂN TÍCH HIỆU SUẤT HỌC SINH")
    print("=" * 50)
    
    # 1. DATA GENERATION & LOADING
    print("\n📊 STEP 1: LOADING DATA")
    np.random.seed(42)
    
    # Simulate realistic student data
    n_students = 500
    departments = ['Computer Science', 'Business', 'Engineering', 'Mathematics', 'Physics']
    cities = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng']
    
    student_data = []
    for i in range(n_students):
        dept = np.random.choice(departments)
        
        # Department influences base GPA
        dept_gpa_base = {
            'Computer Science': 7.8,
            'Business': 7.2,
            'Engineering': 7.5,
            'Mathematics': 8.0,
            'Physics': 7.7
        }
        
        base_gpa = dept_gpa_base[dept]
        gpa = np.random.normal(base_gpa, 1.2)
        gpa = max(0, min(10, gpa))  # Clamp to valid range
        
        student = {
            'student_id': f'SV{i+1:04d}',
            'name': f'Student {i+1}',
            'department': dept,
            'gender': np.random.choice(['M', 'F']),
            'age': np.random.randint(18, 25),
            'city': np.random.choice(cities),
            'gpa': gpa,
            'credits_completed': np.random.randint(30, 120),
            'study_hours_per_week': np.random.normal(25, 8),
            'family_income': np.random.choice(['Low', 'Medium', 'High'], p=[0.3, 0.5, 0.2]),
            'has_scholarship': np.random.choice([True, False], p=[0.2, 0.8]),
            'extracurricular_activities': np.random.randint(0, 5)
        }
        
        # Ensure positive study hours
        student['study_hours_per_week'] = max(5, student['study_hours_per_week'])
        
        student_data.append(student)
    
    df = pd.DataFrame(student_data)
    print(f"✅ Loaded {len(df)} student records")
    print(f"📋 Columns: {list(df.columns)}")
    
    # 2. DATA EXPLORATION
    print("\n🔍 STEP 2: DATA EXPLORATION")
    print(f"Dataset shape: {df.shape}")
    print(f"Missing values: {df.isnull().sum().sum()}")
    
    # Basic statistics
    print("\n📊 Key Statistics:")
    print(f"  Average GPA: {df['gpa'].mean():.2f}")
    print(f"  GPA Range: {df['gpa'].min():.2f} - {df['gpa'].max():.2f}")
    print(f"  Average Study Hours: {df['study_hours_per_week'].mean():.1f}")
    print(f"  Scholarship Recipients: {df['has_scholarship'].sum()} ({df['has_scholarship'].mean()*100:.1f}%)")
    
    # Department distribution
    print(f"\n🏫 Students by Department:")
    dept_counts = df['department'].value_counts()
    for dept, count in dept_counts.items():
        print(f"  {dept}: {count} ({count/len(df)*100:.1f}%)")
    
    # 3. DATA CLEANING
    print("\n🧹 STEP 3: DATA CLEANING")
    # Already clean data, but let's show the process
    
    # Check for outliers in GPA
    Q1 = df['gpa'].quantile(0.25)
    Q3 = df['gpa'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    outliers = df[(df['gpa'] < lower_bound) | (df['gpa'] > upper_bound)]
    print(f"📈 GPA Outliers detected: {len(outliers)}")
    
    if len(outliers) > 0:
        print("Outlier GPAs:", outliers['gpa'].tolist())
    
    # 4. ANALYSIS
    print("\n📊 STEP 4: DETAILED ANALYSIS")
    
    # 4.1 Department Analysis
    print("\n🏫 Department Performance Analysis:")
    dept_analysis = df.groupby('department').agg({
        'gpa': ['mean', 'std', 'min', 'max'],
        'study_hours_per_week': 'mean',
        'has_scholarship': lambda x: x.sum() / len(x),
        'student_id': 'count'
    }).round(3)
    
    print(dept_analysis)
    
    # 4.2 Gender Analysis
    print("\n👥 Gender Performance Analysis:")
    gender_analysis = df.groupby(['department', 'gender']).agg({
        'gpa': 'mean',
        'study_hours_per_week': 'mean'
    }).round(3)
    print(gender_analysis)
    
    # 4.3 Correlation Analysis
    print("\n🔗 Correlation Analysis:")
    numeric_cols = ['age', 'gpa', 'credits_completed', 'study_hours_per_week', 'extracurricular_activities']
    correlations = df[numeric_cols].corr()['gpa'].sort_values(ascending=False)
    
    print("Factors most correlated with GPA:")
    for factor, corr in correlations.items():
        if factor != 'gpa':
            print(f"  {factor}: {corr:.3f}")
    
    # 5. STATISTICAL TESTS
    print("\n📈 STEP 5: STATISTICAL TESTING")
    
    # Test if scholarship students have higher GPA
    scholarship_gpa = df[df['has_scholarship']]['gpa']
    no_scholarship_gpa = df[~df['has_scholarship']]['gpa']
    
    from scipy.stats import ttest_ind
    t_stat, p_value = ttest_ind(scholarship_gpa, no_scholarship_gpa)
    
    print(f"🎓 Scholarship Impact on GPA:")
    print(f"  With scholarship: {scholarship_gpa.mean():.3f} ± {scholarship_gpa.std():.3f}")
    print(f"  Without scholarship: {no_scholarship_gpa.mean():.3f} ± {no_scholarship_gpa.std():.3f}")
    print(f"  T-test p-value: {p_value:.6f}")
    print(f"  Significant difference: {'Yes' if p_value < 0.05 else 'No'}")
    
    # 6. PREDICTIVE MODELING
    print("\n🤖 STEP 6: PREDICTIVE MODELING")
    
    try:
        from sklearn.ensemble import RandomForestRegressor
        from sklearn.model_selection import train_test_split
        from sklearn.metrics import r2_score, mean_absolute_error
        
        # Prepare features
        df_model = df.copy()
        df_model = pd.get_dummies(df_model, columns=['department', 'gender', 'city', 'family_income'])
        
        # Select features
        feature_cols = [col for col in df_model.columns if col not in 
                       ['student_id', 'name', 'gpa']]
        
        X = df_model[feature_cols]
        y = df_model['gpa']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Train model
        rf_model = RandomForestRegressor(n_estimators=100, random_state=42)
        rf_model.fit(X_train, y_train)
        
        # Evaluate
        y_pred = rf_model.predict(X_test)
        r2 = r2_score(y_test, y_pred)
        mae = mean_absolute_error(y_test, y_pred)
        
        print(f"🎯 Random Forest Model Performance:")
        print(f"  R-squared: {r2:.4f}")
        print(f"  Mean Absolute Error: {mae:.4f}")
        
        # Feature importance
        feature_importance = pd.DataFrame({
            'feature': feature_cols,
            'importance': rf_model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print(f"\n🔝 Top 5 Most Important Features:")
        for _, row in feature_importance.head().iterrows():
            print(f"  {row['feature']}: {row['importance']:.4f}")
        
    except ImportError:
        print("scikit-learn not available for modeling")
    
    # 7. INSIGHTS & RECOMMENDATIONS
    print("\n💡 STEP 7: KEY INSIGHTS & RECOMMENDATIONS")
    print("=" * 50)
    
    insights = [
        f"📚 Students spend average {df['study_hours_per_week'].mean():.1f} hours/week studying",
        f"🏆 {dept_counts.index[0]} has most students ({dept_counts.iloc[0]})",
        f"🎓 Scholarship students have {'higher' if scholarship_gpa.mean() > no_scholarship_gpa.mean() else 'similar'} GPA",
        f"📊 Study hours correlation with GPA: {df['study_hours_per_week'].corr(df['gpa']):.3f}",
        f"🎯 {len(df[df['gpa'] >= 8.0])} students ({len(df[df['gpa'] >= 8.0])/len(df)*100:.1f}%) achieve GPA ≥ 8.0"
    ]
    
    for i, insight in enumerate(insights, 1):
        print(f"{i}. {insight}")
    
    print(f"\n🎯 RECOMMENDATIONS:")
    recommendations = [
        "Increase study support for students with <20 hours/week",
        "Expand scholarship programs (positive correlation with performance)",
        "Focus on departments with lower average GPAs",
        "Encourage balanced extracurricular participation",
        "Implement early warning system for at-risk students"
    ]
    
    for i, rec in enumerate(recommendations, 1):
        print(f"{i}. {rec}")
    
    return df

# Chạy complete analysis
# final_df = complete_data_analysis_project()
```

---

## 🔗 Liên Kết Đến Các Bài Học Khác

- [📋 Python Cheatsheet](./python-cheatsheet.md) - Tham khảo nhanh syntax
- [🔧 Built-in Functions](./built-in-functions.md) - Functions hữu ích cho data analysis
- [📦 Common Modules](./common-modules.md) - Modules quan trọng
- [⚡ Performance Tips](./performance-tips.md) - Tối ưu code cho big data

---

## 🎯 Tóm Tắt

### 📊 **Essential Libraries:**
- **pandas** - Data manipulation và analysis
- **NumPy** - Numerical computing
- **matplotlib** - Static plotting
- **seaborn** - Statistical visualization  
- **scipy** - Scientific computing
- **plotly** - Interactive visualization

### 🔧 **Core Skills:**
- **Data Loading** - CSV, Excel, JSON, databases
- **Data Cleaning** - Handle missing values, outliers, duplicates
- **Data Exploration** - Descriptive statistics, distributions
- **Data Visualization** - Charts, plots, dashboards
- **Statistical Analysis** - Hypothesis testing, correlations
- **Modeling** - Linear regression, predictions

### 📈 **Analysis Workflow:**
1. **Load & Explore** - Understand your data
2. **Clean & Prepare** - Handle quality issues
3. **Analyze & Visualize** - Find patterns
4. **Test Hypotheses** - Statistical validation
5. **Model & Predict** - Build predictive models
6. **Communicate Results** - Insights & recommendations

### 💡 **Best Practices:**
- **Start Simple** - Basic stats before advanced modeling
- **Visualize Early** - Plots reveal insights quickly
- **Validate Assumptions** - Test statistical requirements
- **Document Process** - Reproducible analysis
- **Question Results** - Does it make business sense?

### 🎯 **Common Pitfalls:**
- **Data Leakage** - Using future information
- **Overfitting** - Model too complex for data
- **Correlation ≠ Causation** - Don't assume cause
- **Selection Bias** - Non-representative samples
- **Missing Context** - Numbers without business understanding

---

*📝 Được cập nhật: Tháng 9, 2024*  
*💡 Tip: "In God we trust, all others must bring data" - W. Edwards Deming*
