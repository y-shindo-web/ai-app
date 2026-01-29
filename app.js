$(function() {
    const apiKey = "YOUR_GEMINI_API_KEY"; // 取得したGeminiのAPIキー

    $("#ask-ai").on("click", async function() {
        const ingredients = $("#ingredients").val();
        if(!ingredients) return alert("食材を入力してください！");

        $("#recipe-result").html("<p>AIシェフが考えています...</p>");

        // Gemini APIのエンドポイント（モデルは gemini-1.5-flash が速くておすすめ）
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `あなたはプロのシェフです。以下の食材だけを使った美味しいレシピを1つ提案してください。作り方の工程も詳しく教えてください。\n食材：${ingredients}`
                        }]
                    }]
                })
            });

            const data = await response.json();
            
            // Geminiからの回答を取り出す（少し深い階層にあります）
            const recipe = data.candidates[0].content.parts[0].text;
            
            // 結果を表示（改行を反映させるためにCSSで white-space: pre-wrap; をあてるのがコツ）
            $("#recipe-result").html(`<div class="recipe-content">${recipe}</div>`);

        } catch (error) {
            console.error(error);
            $("#recipe-result").text("通信エラーが発生しました。");
        }
    });
});