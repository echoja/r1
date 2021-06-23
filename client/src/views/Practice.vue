<template>
  <div id="hi" class="container text-left ml-5">
    <h1>Practice</h1>

    <hr />
    <div>
      <a href = "https://sites.google.com/view/hyojungkim">
      <img src="../assets/Title_top.gif" alt="Title_top"/>
      </a>
    </div>
    <hr />

    <table border = 2>
      <tr><td colspan=3> <img src="../assets/affiliation.jpg" alt="affiliation"/></td></tr>
      <tr>
        <td>
          <a href="https://www.nature.com/articles/s41598-020-58088-2">
            <img src="../assets/Research_1.jpg" alt="affiliation" style="max-width:100%"/>
          </a>
        </td>
        <td> <img src="../assets/ITProject_2.png" alt="ITProject"/> </td>
        <td> <img src="../assets/Clinical_practice_3.png" alt="ITProject"/> </td>
      </tr>
    </table>

    <hr />
    <img src="../assets/Summary.jpg" alt="Summary"/>
    <hr />

    <div style ="border" float:right>
    Contact: <a href="mailto:arcane@skku.edu">arcane@skku.edu</a>
    </div>

    <p>Paragraph</p>

    <div style="display: block;">hello</div>
    <div style="display: block;">hello</div>
    <div style="display: block;">hello</div>
    <div style="display: inline-block;">hello</div>
    <div style="display: inline-block;">hello</div>
    <div style="display: inline-block;">hello</div>
    <div style="display: inline-block;">hello</div>
    <div style="display: block;">hello</div>
    <div style="display: inline; height: 100px;">ABCDE</div>
    <div style="display: inline; height: 100px;">ABCDE</div>
    <div style="display: inline; height: 100px;">ABCDE</div>
    <div style="display: inline-block; height: 100px;">ABCDE</div>
    <div style="display: inline-block; height: 100px;">ABCDE</div>
    <div style="display: inline-block; height: 100px;">ABCDE</div>



    <h1>Page title</h1>
    <h2>Subheading</h2>
    <h3>Tertiary heading</h3>
    <h4>Quaternary heading</h4>
    <hr />

    <p>Paragraph</p>
    <hr />
    <img src="../assets/image.jpeg" alt="설명" height="48" width="100" />
    <hr />
    <a href="#footer">Jump to footnote</a>
    <br />
    <a id="footer"></a>
    <p>Footnote content</p>
    <hr />

    <p><strong>Bold text</strong></p>
    <p><em>Italic text</em></p>
    <p><span style="text-decoration: underline">Underlined text</span></p>
    <p><span class="test">Underlined text</span></p>
    <hr />

    <table>
      <caption>
        Phone numbers
      </caption>
      <thead>
        <tr>
          <th>Name</th>
          <th colspan="2">Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
          <td>577854</td>
          <td>577855</td>
        </tr>
        <tr>
          <td>Jack</td>
          <td>577856</td>
          <td>577857</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>&nbsp;</td>
          <td>Personal</td>
          <td>Office</td>
        </tr>
      </tfoot>
    </table>
    <hr />
    <ul>
      <li>First</li>
      <li>Second</li>
      <li>Third</li>
    </ul>
    <ol>
      <li>First</li>
      <li>Second</li>
      <li>Third</li>
    </ol>
    <hr />
    <form @submit.prevent="none">
      Name: <input name="name" type="text" /> <br />
      Age:
      <input max="99" min="1" name="age" step="1" type="number" value="18" />
      <br />
      <select name="gender">
        <option selected="selected" value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br />

      <input checked="checked" name="newsletter" type="radio" value="daily" />Daily
      <input name="newsletter" type="radio" value="weekly" /> Weekly

      <br />
      <textarea cols="20" name="comments" rows="5">Comment</textarea><br />
      <label for="terms">
        Accept terms
      </label>
      <input id="terms" name="terms" type="checkbox" value="tandc" />
      <br />
      <input type="submit" value="Submit" />
    </form>
    <hr />

    <hr />
    <br />
    <div style="height: 1000px">long</div>
    <h2>CSS</h2>
    <p>
      자세한 정보는 다음을 참조하세요:
      <a href="https://devhints.io/css" target="_blank">Cheatsheet</a>
    </p>
    <h2>Javascript</h2>
    <div class="p-3 mb-3 border">
      <p id="number">0</p>
      <button id="add-number">어려운 숫자 추가</button>
    </div>
    <div class="p-3 mb-3 border">
      <p>{{ easyNumber }}</p>
      <button @click="addEasyNumber">쉬운 숫자 추가</button>
    </div>

  </div>
</template>


<script>
import { onMounted, ref } from "vue";
export default {
  name: "Practice",
  components: {
  },
  setup(props, ctx) {
    onMounted(() => {
      // 어려운 숫자 추가를 하는 부분
      const buttonDom = document.getElementById("add-number");
      const numberDom = document.getElementById("number");
      if (!buttonDom || !numberDom) return;
      buttonDom.addEventListener("click", (ev) => {
        let number = parseInt(numberDom.childNodes[0].nodeValue, 10);
        if (isNaN(number)) return;
        number += 1;
        numberDom.childNodes[0].nodeValue = number;
      });
    });
    return {
      test: 1,
      easyNumber: ref(0),
      icons: {
        chart: areaChartOutlined,
      },
    };
  },
  methods: {
    none() {
      console.log("none");
    },
    addEasyNumber() {
      this.easyNumber++;
    },
  },
};
</script>

<style>

.test {
  text-decoration: underline;
}

</style>
