$(function() {
    // ここにAPIキーを入力
    const apiKey = ""; 

    $("#ask-ai").on("click", async function() {
        const ingredients = $("#ingredients").val();
        if(!ingredients) return alert("食材を入力してください！");

        $("#recipe-result").html("<p>AIシェフが考えています...</p>");

            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `あなたはプロのシェフです。以下の食材をメインに使った美味しいレシピを1つ提案してください。チーズアカデミー卒業生が喜ぶような、少しオシャレな演出も含めてください。\n食材：${ingredients}`
                        }]
                    }]
                })
            });

            const data = await response.json();
            
            if (data.candidates && data.candidates[0]) {
                const recipe = data.candidates[0].content.parts[0].text;
                $("#recipe-result").html(`<div class="recipe-content">${recipe}</div>`);
            } else {
                $("#recipe-result").text("エラー内容: " + (data.error ? data.error.message : "リミット制限中です。少し待ってからお試しください。"));
            }

        } catch (error) {
            $("#recipe-result").text("通信に失敗しました。");
        }
    });
});