<script setup lang="ts"></script>
<template>
  <footer>
    <div class="footer-content">
      <span>Copyright 2025</span>
      <ul>
        <li>
          <router-link to="/terms-of-use">
            <span aria-hidden="true">📜</span> Terms of use
          </router-link>
        </li>
        <li>
          <router-link to="/privacy-policy">
            <span aria-hidden="true">🔒</span> Privacy policy
          </router-link>
        </li>
        <li>
          <router-link to="/contact"> <span aria-hidden="true">✉️</span> Contact </router-link>
        </li>
      </ul>
    </div>
  </footer>
</template>
<script lang="ts" setup></script>
<style scoped>
footer {
  background-color: var(--brand);
  margin-top: 100px;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 70px 0;
  color: #fff;
  max-width: 1200px;
}

.footer-content span {
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.footer-content ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  gap: 16px;
}

.footer-content li {
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.footer-content a {
  color: #fff;
  text-decoration: none;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 30px 0;
  }
  .footer-content ul {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}
</style>
