<?php
namespace App;

class HTML {

    public function instructions($post)
    {
        if (empty($post)){
            return <<<HTML
            <div class="htmlInstructions">
                <ol>
                    <li>Pour chaque équipements, entrez la quantitée que vous souhaitez installer.</li>
                    <li>Choisissez un matériau si vous le souhaitez.</li>
                    <li>Appuyez sur "Dimensionner".</li>
                    <li>Pour connaître le diamètre de l'évacuation, cliquez sur le bouton ci-dessous.</li>
                </ol>
            </div>
            HTML;
        }
    }
}