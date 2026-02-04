# Activitat2-Exec-Spawn-Fork

---

D'acord, anem a pams. L'objectiu de la primera part és fer servir la funció **`exec`** de Node.js per executar una comanda del sistema operatiu (com si la tinguessis escrita directament a la terminal o CMD) i rebre tot el resultat de cop quan acabi.

Aquí tens la guia pas a pas per fer-ho tu mateix:

### Pas 1: Preparació de l'entorn
1. Crea una carpeta per al teu projecte (per exemple: `activitat-node`).
2. Dins de la carpeta, crea un fitxer anomenat **`main.js`**.

### Pas 2: Importar la funcionalitat
Per poder crear processos fills, Node.js té un mòdul natiu anomenat `child_process`. Com que només vols fer el primer exercici, importarem només `exec`.

Escriu això al principi del teu `main.js`:
```javascript
const { exec } = require('child_process');
```

### Pas 3: Detectar el sistema operatiu
L'exercici diu que si estàs a Windows has de fer `dir` i si estàs a Linux/Mac has de fer `ls -la`. Podem fer que el programa ho detecti sol:

```javascript
// Mirem si la plataforma és 'win32' (Windows), si no, assumim que és tipus Unix (Linux/Mac)
const comanda = process.platform === 'win32' ? 'dir' : 'ls -la';

console.log(`Executant la comanda: ${comanda}...`);
```

### Pas 4: Executar la comanda i gestionar el resultat
La funció `exec` rep dos arguments:
1. La cadena de text amb la comanda a executar.
2. Una funció (callback) que s'executa **només quan el procés ja ha acabat**. Aquesta funció rep tres paràmetres: `error`, `stdout` (sortida estàndard) i `stderr` (errors del sistema).

Afegeix aquest codi:

```javascript
exec(comanda, (error, stdout, stderr) => {
    // 1. Comprovem si hi ha hagut un error d'execució (p.ex. comanda no trobada)
    if (error) {
        console.error(`❌ Error en executar la comanda: ${error.message}`);
        console.log(`Codi d'estat (exit code): ${error.code}`);
        return; // Parem aquí si ha anat malament
    }

    // 2. Comprovem si la comanda ha enviat algun error per la sortida d'errors
    if (stderr) {
        console.log(`Avisos/Errors de la comanda (stderr): ${stderr}`);
    }

    // 3. Mostrem el resultat principal
    console.log("--- RECOMPTE DEL DIRECTORI (stdout) ---");
    console.log(stdout);
    
    // 4. Indicar que ha acabat bé
    console.log("✅ El procés ha finalitzat correctament (Codi 0).");
});
```

### Pas 5: Com provar-ho
1. Obre la teva terminal dins de la carpeta del projecte.
2. Executa el fitxer amb Node:
   ```bash
   node main.js
   ```

### Explicació del que passarà:
*   **No veuràs res immediatament**: El programa esperarà que el sistema operatiu acabi de llegir els fitxers.
*   **Tot de cop**: Quan el sistema tingui tota la llista de fitxers preparada, la funció `exec` "despertarà" el teu callback i s'imprimirà tot el bloc de text al `console.log(stdout)`.
*   **Gestió d'errors**: Si per algun motiu canviessis la comanda per una que no existeix (com `inventat`), veuries com entra per l' `if (error)` i t'explica què ha fallat.

Amb això ja tindries el **punt 1** completat. T'ha quedat clar el funcionament de la funció de retorn (callback) de l' `exec`?
