<h1 align="center">Weather Now</h1>
<div align="center">
  <a href="#descrição">Descrição</a> |
  <a href="#iniciar">Iniciar</a> |
  <a href="#licença">Licença</a>
</div>

<p align="center">
  <img src="https://img.shields.io/github/license/matheus369k/weather-now.svg"/>
</p>
<p>
 <img src="public/project-preview.jpg" />
</p>

## Descrição

Weather Now é o seu destino rápido para verificar as condições do tempo e previsões na sua cidade ou em qualquer local que você escolher.A aplicação e um site que, monstra as variações do clima e suas principais funcionalidades são:

- Diferentes formato dos dados, os padrões metric e imperil.
- Buscador, encontre uma cidade e veja sé o clima estar favorável.

Acesse o site **[Weather Now](https://weather-now-ruddy-alpha.vercel.app/)**.

## Iniciar

E Necessário ter o Nodejs e o git instalado.

Faça clone do repositório localmente.

```bash
git clone https://github.com/matheus369k/weather-now.git
cd ./weather-now
```

Instale as dependencies

```bash
pnpm
```

Crie um arquivo **.env**, com as variares ambientes abaixo

```bash
# GeoLocation APIs
NEXT_PUBLIC_GEOLOCATION_API_URL=https://geocoding-api.open-meteo.com/v1/search
NEXT_PUBLIC_COUNTRY_FLAGS_API_URL=https://restcountries.com/v3.1/name
NEXT_PUBLIC_IP6_API_URL=https://api64.ipify.org/?format=json

## For get apiKey access site:https://getgeoapi.com
NEXT_PUBLIC_CURRENT_LOCATION_API_URL=https://api.getgeoapi.com/v2/ip/
NEXT_PUBLIC_CURRENT_LOCATION_API_KEY=api_key

# Weather API
NEXT_PUBLIC_WEATHER_API_URL=https://api.open-meteo.com/v1/forecast
```

Agora você pode iniciar o projetos

```bash
pnpm dev
```

## Licença

Licença usada **[MIT](./LICENSE.txt)**
