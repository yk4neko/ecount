import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  //static targets = [ "user", "count" ]

        totalCount = 0;
        plantStages = ['🌱', '🌿', '🌿🌿', '🌳', '🌳🌸', '🌳🍎'];

	connect() {
		this.totalCount = parseInt(this.data.get("count"));
		this.updatePlant();
	}

        updateCount() {
            const input = document.getElementById('input');
            const count = parseInt(input.value);
            if (isNaN(count) || count < 0 || count > 100) {
                alert('0から100までの数値を入力してください');
                return;
            }
            if (this.totalCount + count > 100) {
                alert('合計が100を超えています。最大100回までです。');
                return;
            }
            this.totalCount += count;
            document.getElementById('count').textContent = this.totalCount;
            this.updatePlant();
            input.value = '';
            this.checkCompletion();

	const token = document.getElementsByName("csrf-token")[0].content;
	let formData = new FormData()
	formData.append("user_id", this.data.get("id"));
	formData.append("count", this.totalCount);
	fetch(this.data.get("save-url"), {
		body: formData,
		method: 'PATCH',
		credentials: "include",
		dataType: "script",
		headers: {
		      "X-CSRF-Token": token
		},
	})
	.then(function(response) {
		if (response.status != 204) {
			//TODO
		}
	});

        }

        updatePlant() {
            const plantElement = document.getElementById('plant');
            if (this.totalCount >= 50) {
                const appleCount = Math.min(Math.floor((this.totalCount - 40) / 6), 10);
                plantElement.textContent = '🌳' + '🍎'.repeat(appleCount);
            } else if (this.totalCount >= 40) {
                plantElement.textContent = this.plantStages[5]; // リンゴ1個の木
            } else if (this.totalCount >= 30) {
                plantElement.textContent = this.plantStages[4]; // 花が咲いた木
            } else if (this.totalCount >= 20) {
                plantElement.textContent = this.plantStages[3]; // 小さな木
            } else if (this.totalCount >= 10) {
                plantElement.textContent = this.plantStages[2]; // 大きな芽
            } else if (this.totalCount >= 5) {
                plantElement.textContent = this.plantStages[1]; // 小さな芽
            } else {
                plantElement.textContent = this.plantStages[0]; // 種
            }
        }

        checkCompletion() {
            const messageElement = document.getElementById('message');
            if (this.totalCount >= 100) {
                messageElement.textContent = 'おめでとうございます！たくさん収穫できましたね！';
                document.getElementById('input').disabled = true;
                document.querySelector('button').disabled = true;
            } else if (this.totalCount >= 50) {
                const appleCount = Math.min(Math.floor((this.totalCount - 40) / 6), 10);
                messageElement.textContent = `すごい！${appleCount}個のリンゴが実りました！`;
            } else {
                messageElement.textContent = '';
            }
        }

  save(event) {
    const token = document.getElementsByName("csrf-token")[0].content;
    let formData = new FormData()
    formData.append("user_id", this.userTarget.value);
    formData.append("count", this.countTarget.value);
    fetch(this.data.get("save-url"), {
      body: formData,
      method: 'PATCH',
      credentials: "include",
      dataType: "script",
      headers: {
              "X-CSRF-Token": token
       },
    })
    .then(function(response) {
      if (response.status != 204) {
          //TODO
      }
    });
  }

}
