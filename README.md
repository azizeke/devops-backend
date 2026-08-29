# DevOps Backend

## Amaç ve Kullanılan Teknolojiler
Bu proje, DevOps eğitim projesi kapsamında geliştirilen basit bir REST API'dir.

- **Runtime:** Node.js
- **Framework:** Express
- **Diğer:** cors, dotenv
- **Process Manager (sunucuda):** PM2
- **Reverse Proxy:** Nginx
- **CI/CD:** GitHub Actions

## Canlı Adres
https://aziz-backend.team-vit-devops.nl

## Endpoint'ler
| Method | Path | Açıklama |
|--------|------|----------|
| GET | `/` | Uygulamanın çalıştığını gösterir |
| GET | `/api/health` | Sağlık durumu (`{"status":"UP"}`) |
| GET | `/api/info` | Uygulama adı, versiyon, ortam bilgisi |

## Local Ortamda Çalıştırma
```bash
git clone <bu-repo-url>
cd devops-backend
npm install
cp .env.example .env
npm start
```
Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

## Environment Variable'lar
`.env.example` dosyasına bakınız. Gerçek `.env` dosyası repository'ye eklenmez.

| Değişken | Açıklama |
|----------|----------|
| `PORT` | Uygulamanın çalışacağı local port (varsayılan 3000) |
| `NODE_ENV` | Ortam (`development` / `production`) |
| `APP_VERSION` | `/api/info` endpoint'inde dönen versiyon bilgisi |

## Production'a Deploy Süreci
1. `main` branch'ine yapılan her push, GitHub Actions workflow'unu (`.github/workflows/deploy.yml`) tetikler.
2. Workflow, SSH ile sunucuya bağlanır (`SERVER_SSH_KEY` secret'ı ile, parola kullanılmaz).
3. Kod `DEPLOY_PATH` altına (`/var/www/backend-app`) kopyalanır.
4. Sunucuda `npm install --production` çalıştırılır.
5. Uygulama PM2 üzerinden kontrollü şekilde yeniden başlatılır (`pm2 reload`).
6. `/api/health` endpoint'i çağrılarak deployment doğrulanır.

Sunucuya manuel bağlanıp `git pull` yapmak bu projede kabul edilen bir yöntem değildir; tüm süreç GitHub Actions üzerinden otomatik yürür.

## Kullanılan GitHub Secrets
| Secret | Açıklama |
|--------|----------|
| `SERVER_HOST` | VPS IP adresi |
| `SERVER_USER` | Deployment için kısıtlı yetkili kullanıcı (root değil) |
| `SERVER_SSH_KEY` | SSH private key |
| `SERVER_PORT` | SSH portu |
| `DEPLOY_PATH` | Sunucuda backend kodunun bulunduğu dizin |

## Nginx / Backend İlişkisi
Backend yalnızca `127.0.0.1:3000` üzerinde dinler; dış dünyaya doğrudan açık değildir.
Dış erişim yalnızca Nginx reverse proxy üzerinden, `https://aziz-backend.team-vit-devops.nl` adresi ile sağlanır.
