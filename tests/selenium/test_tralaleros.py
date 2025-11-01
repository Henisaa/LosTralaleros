from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import NoAlertPresentException
import time

BASE = "http://localhost:3000"

# Casos
tests = [
    ("usuario_invalido@gmailx.com", "1234", "1234", "fail"),  # email inválido
    ("test@duoc.cl", "1234", "12345", "fail"),               # contraseñas distintas
    ("user1@gmail.com", "abcd", "abcd", "success"),          # registro correcto
]

# Setup navegador
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.maximize_window()

def close_alert_if_present():
    """Cierra un alert de JS si aparece y retorna el texto"""
    try:
        alert = driver.switch_to.alert
        text = alert.text
        alert.accept()
        return text
    except NoAlertPresentException:
        return None

def register(email, p1, p2):
    """Flujo de registro"""
    driver.get(f"{BASE}/auth/register")
    time.sleep(1)

    driver.find_element(By.CSS_SELECTOR, "[data-testid='register-email']").send_keys(email)
    driver.find_element(By.CSS_SELECTOR, "[data-testid='register-password']").send_keys(p1)
    driver.find_element(By.CSS_SELECTOR, "[data-testid='register-password2']").send_keys(p2)

    driver.find_element(By.CSS_SELECTOR, "[data-testid='register-region']").send_keys("Metropolitana de Santiago")
    time.sleep(0.3)
    driver.find_element(By.CSS_SELECTOR, "[data-testid='register-comuna']").send_keys("Santiago")

    # Check "Aceptar términos" con fallback JS click
    terms = driver.find_element(By.CSS_SELECTOR, "[data-testid='register-terms']")
    driver.execute_script("arguments[0].scrollIntoView(true);", terms)
    time.sleep(0.2)
    try:
        terms.click()
    except:
        driver.execute_script("arguments[0].click();", terms)

    # Click botón registrar
    driver.find_element(By.CSS_SELECTOR, "[data-testid='register-btn']").click()
    time.sleep(0.8)

    return close_alert_if_present()

def login(email, pwd):
    """Flujo login"""
    driver.get(f"{BASE}/auth/login")
    time.sleep(1)

    driver.find_element(By.CSS_SELECTOR, "[data-testid='login-email']").send_keys(email)
    driver.find_element(By.CSS_SELECTOR, "[data-testid='login-password']").send_keys(pwd)
    driver.find_element(By.CSS_SELECTOR, "[data-testid='login-btn']").click()

    time.sleep(0.8)
    return close_alert_if_present()

# Ejecutar pruebas de registro
for email, p1, p2, expected in tests:
    print(f"\n🔎 Probando registro: {email}")

    alert_text = register(email, p1, p2)

    if expected == "success" and alert_text is None:
        print(f"✅ Registro correcto para {email}")
    elif expected == "fail" and alert_text is not None:
        print(f"✅ Error esperado ({alert_text}) para {email}")
    else:
        print(f"❌ Resultado inesperado para {email}")

# Login con usuario no registrado
print("\n🔎 Probando login NO registrado...")
alert = login("noexiste@gmail.com", "1234")
if alert:
    print(f"✅ Error esperado login inválido: {alert}")
else:
    print("❌ ERROR: Login inválido NO falló")

# Login con usuario correcto
print("\n🔎 Probando login correcto...")
alert = login("user1@gmail.com", "abcd")

if not alert:
    print("✅ Login exitoso")
else:
    print(f"❌ Falló login válido: {alert}")

driver.quit()
print("\n🎉 Todas las pruebas completadas ✅")
