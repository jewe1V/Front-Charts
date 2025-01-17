import requests
from bs4 import BeautifulSoup
import pandas as pd


def fetch_exchange_rates(date_str, currency_list):
    """
    Получение курсов валют с сайта ЦБ РФ на указанную дату.

    Args:
        date_str (str): Дата в формате 'дд/мм/гггг'.
        currency_list (list): Список кодов валют для получения курса.

    Returns:
        dict: Словарь с курсами валют и датой.
    """
    url = f"http://www.cbr.ru/scripts/XML_daily.asp?date_req={date_str}"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'xml')

    exchange_rates = {'date': date_str}
    for currency_code in currency_list:
        exchange_rates[currency_code] = None
        currency_tag = soup.find('CharCode', string=currency_code)

        if currency_tag:
            if currency_code == 'BYR':
                rate_value = currency_tag.find_next_sibling('Value').get_text()
            else:
                rate_value = currency_tag.find_next_sibling('VunitRate').get_text()

            exchange_rates[currency_code] = round(float(rate_value.replace(',', '.')), 8)

    return exchange_rates


start_date = '2003-01-01'
end_date = '2023-12-31'
date_range = pd.date_range(start=start_date, end=end_date, freq='MS')
currency_codes = ['BYR', 'USD', 'EUR', 'KZT', 'UAH', 'AZN', 'KGS', 'UZS', 'GEL', 'BYN']

exchange_data = []
for current_date in date_range:
    formatted_date = current_date.strftime('%d/%m/%Y')
    rates_on_date = fetch_exchange_rates(formatted_date, currency_codes)
    exchange_data.append(rates_on_date)

pd.DataFrame(exchange_data).to_csv('tables/rates.csv', index=False)