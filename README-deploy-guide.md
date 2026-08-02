# GB商事合同会社 官網 — 部署說明（第二版）

這是一個純靜態網站（沒有資料庫、沒有後端），電腦上直接雙擊 `index.html` 就能離線瀏覽。
若要讓大家都能在網路上看到，最簡單、免費的方式是用 **GitHub Pages**。

---

## 上線前，有一件事一定要做：設定聯絡表單

聯絡我們頁面的表單現在會「直接送出」，不會再跳出您的信箱軟體。這是透過一個
免費、不需要架伺服器的服務 **Web3Forms** 做到的，但需要您花 1 分鐘拿到一組
專屬的「Access Key」，步驟如下：

1. 開啟 https://web3forms.com
2. 在首頁輸入您要收信的信箱：`gbfudousan@gmail.com`，按下「Create Access Key」
3. Web3Forms 會寄一封信到這個信箱，裡面有一組像 `a1b2c3d4-....` 的 Access Key
4. 打開 `contact.html`，找到這一行（大約在表單最上面）：
   ```html
   <input type="hidden" name="access_key" value="PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE">
   ```
   把 `PASTE_YOUR_WEB3FORMS_ACCESS_KEY_HERE` 換成您拿到的 Access Key，存檔
5. 完成！之後客人在網站表單按「送出諮詢」，內容就會直接寄到您的信箱，客人不需要開啟任何郵件軟體

> 在您替換 Access Key 之前，表單會顯示提示訊息，不會誤發空白信件，所以不用擔心忘記設定會出錯。

## 用 GitHub Pages 免費架站

1. 註冊一個 GitHub 帳號：https://github.com/join （已有帳號可跳過）
2. 建立一個新的 Repository（儲存庫），名稱可以取 `gbhouse-site`，設定為 **Public**（公開）
3. 把這個資料夾裡的所有檔案（`index.html`、`about.html`…、`css/`、`js/`、`assets/` 等）上傳上去
   - 最簡單的方式：進入該 repository 頁面 → 點「Add file」→「Upload files」→ 把整個資料夾內的檔案拖進去 → 按「Commit changes」
4. 上傳完成後，進入 repository 的 **Settings → Pages**
5. 在「Build and deployment」的「Source」選擇 `Deploy from a branch`，Branch 選 `main` / `(root)`，按「Save」
6. 等待約1-2分鐘，畫面會出現一個網址，例如：
   `https://你的帳號名稱.github.io/gbhouse-site/`
   這就是您可以分享出去的正式網址

> 注意：GitHub Pages 是「公開」的免費空間，任何人都能瀏覽網站內容（就跟一般網站一樣），
> 但**不會**顯示您私人帳號的其他資料，只會顯示您上傳的這些網頁檔案。

之後若要更新內容，只要到 repository 裡編輯對應的檔案並 Commit，網站會在幾分鐘內自動更新。

---

## 這一版更新了什麼

1. **LOGO**：已換成您提供的正式LOGO，並去除白色背景，讓圖案能融入網站底色。header／footer／首頁大圖都已更新，公司名稱下方也拿掉了英文小字。
2. **配色**：整個網站改為明亮的水藍色系（呼應LOGO顏色），搭配珊瑚橘作為按鈕與重點色，走活潑、有朝氣的風格。
3. **SUUMO／HOME'S 連結**：點擊後會自動開啟 Google 翻譯的中文版頁面（按鈕上會標註「中文翻譯版」），方便不熟日文的客人瀏覽；因為是機器翻譯，正式洽談時仍建議對照日文原文，頁面上也加了提醒文字。
4. **聯絡表單**：改為直接送出（見上方「上線前設定」），新增「需求類型（自住／投資／未定）」與「預算」欄位，預算區間比照一般不動產平台的常見級距。
5. **LINE**：換成官方帳號 `@381wtasq`，聯絡頁新增可直接掃描的 QR Code（`assets/line-qr.png`）。
6. **粉絲團連結**：「負責人粉絲團」改名為「巨鼻爸爸粉絲團」；YouTube 頻道與另外兩個粉絲團（買賣／租賃）連結都在每頁頁尾。
7. **專業說明簡化**：拿掉「司法書士／律師／稅務顧問」的敘述，改為「具備宅建士資格的人員以中文說明合約內容」，更貼近實際情況。
8. **地址更新**：已改為新址「〒544-0034 大阪市生野区桃谷1-13-17桃谷駅前ビル302号室」，聯絡頁地圖也一併更新。
9. **主要業務擴充**：公司介紹頁新增留學代辦、包車旅遊、不動產裝修、網路電信辦理協助、各種保險辦理協助等服務卡片。
10. **辦公室與代表人照片**：公司介紹頁新增洽談室與代表人照片（含執照資訊）。

## 檔案結構

```
gbhouse-site/
├── index.html          首頁
├── about.html           公司介紹
├── properties.html      物件情報（找房平台連結，含中文翻譯版）
├── immigration.html     日本移民
├── faq.html              常見問題
├── contact.html          聯絡我們（含表單、LINE QR code、地圖）
├── css/style.css         網站樣式
├── js/main.js            語言切換 / 選單 / 表單送出功能
└── assets/
    ├── logo.png           公司LOGO（已去背）
    ├── logo-lg.png         LOGO大圖版本（供未來使用）
    ├── favicon.ico         瀏覽器分頁小圖示
    ├── line-qr.png         LINE官方帳號 QR Code
    ├── office.jpg          辦公室洽談室照片
    └── representative.jpg  代表人照片
```

## 雙語切換

網站右上角有「中文／日本語」切換鈕，所有頁面文字都準備了中日雙語版本，
切換後會記住您的選擇（下次開啟其他頁面也會維持同一語言）。
