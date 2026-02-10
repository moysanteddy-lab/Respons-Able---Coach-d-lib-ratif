# Worker Accès Beta - Respons'Able

## 1. Créer un compte Resend (envoi d'emails)

1. Va sur https://resend.com et crée un compte gratuit
2. Va dans "API Keys" et crée une nouvelle clé
3. Copie la clé (commence par `re_...`)

## 2. Créer le KV Namespace dans Cloudflare

1. Va sur https://dash.cloudflare.com
2. Dans le menu gauche : **Workers & Pages** > **KV**
3. Clique **Create a namespace**
4. Nom : `responsable-access-db`
5. Copie l'ID du namespace créé

## 3. Déployer le Worker

### Option A : Via le Dashboard Cloudflare (plus simple)

1. Va sur https://dash.cloudflare.com
2. **Workers & Pages** > **Create application** > **Create Worker**
3. Nom : `responsable-access`
4. Clique **Deploy**
5. Clique **Edit code**
6. Remplace tout le code par le contenu de `worker.js`
7. Clique **Save and deploy**

### Option B : Via Wrangler CLI

```bash
cd worker-access
npm install -g wrangler
wrangler login
wrangler deploy
```

## 4. Configurer les variables d'environnement

1. Dans Cloudflare Dashboard, va sur ton Worker `responsable-access`
2. **Settings** > **Variables**
3. Ajoute ces variables :

| Variable | Valeur |
|----------|--------|
| `RESEND_API_KEY` | `re_xxxxx` (ta clé Resend) |
| `ADMIN_EMAIL` | `moysan.teddy@gmail.com` |
| `TOKEN_SECRET` | Un truc random genre `monSecretUltra2024!` |

4. Dans **Settings** > **Bindings** > **KV Namespace bindings** :
   - Variable name : `ACCESS_DB`
   - KV namespace : `responsable-access-db`

## 5. Mettre à jour l'URL dans app.js

Si ton Worker a une URL différente de `https://responsable-access.moysan-teddy.workers.dev`,
modifie la ligne dans `app.js` :

```javascript
const ACCESS_WORKER_URL = 'https://ton-worker.ton-compte.workers.dev';
```

## 6. Tester

1. Ouvre ton app
2. Entre un email
3. Tu devrais recevoir un email avec les boutons Autoriser/Refuser
4. Clique Autoriser
5. Refresh l'app avec le même email → Accès !

## Structure des données KV

Chaque email est stocké avec cette structure :
```json
{
  "email": "exemple@email.com",
  "status": "pending|approved|rejected",
  "requestedAt": "2024-01-15T10:30:00.000Z",
  "approvedAt": "2024-01-15T10:35:00.000Z"
}
```
