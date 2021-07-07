<template>
  <div id="hi" class="container text-left mt-10 px-4">
    <h1>Practice</h1>

    <hr />
    <div>
      <a href="https://sites.google.com/view/hyojungkim">
        <img src="../assets/Title_top.gif" alt="Title_top" />
      </a>
    </div>
    <hr />
    <div>
      <img src="../assets/affiliation.jpg" alt="affiliation" />
    </div>
    <div class="flex">
      <div class="flex-1 m-0.5">
        <div class="bg-blue-200">
          <p class="text-center">Research</p>
          <p>Clinical Genome Data Mode (....) Medicine</p>
        </div>

        <img src="../assets/Research_1.jpg" alt="affiliation" /> abc
      </div>
      <div class="flex-1 m-0.5">
        <img src="../assets/ITProject_2.png" alt="ITProject" /> def
      </div>
      <div class="flex-1 m-0.5">
        <img src="../assets/Clinical_practice_3.png" alt="ITProject" />
      </div>
    </div>

    <div class="flex">
      <div class="flex-1">
        <img src="../assets/Timeline.jpg" alt="affiliation" />
      </div>
      <div class="w-36">
        <h1 class="text-center text-blue-900 text-xl font-extrabold mb-16">
          PATENT
        </h1>
        <p class="font-bold text-gray-400">Application</p>
        <p class="mb-48">
          Genome data model managing apparatus for precision medicine
        </p>
        <p class="font-bold text-gray-400">Registration</p>
        <p>Chemotherapy assistant program</p>
      </div>
      <div class="flex-1">
        <!-- HONORS AND PRIZE -->
        <h1 class="text-center text-blue-900 text-xl font-extrabold">
          HONORS AND PRIZE <span class="text-xs">(selected)</span>
        </h1>

        <div v-for="item in honorsAndPrize" :key="item.year">
          <p class="font-bold">{{ item.year }}</p>
          <p>{{ item.content }}</p>
        </div>
      </div>
      <div class="flex-1">
        <!-- Paper -->
        <h1 class="text-center text-blue-900 text-xl font-extrabold">PAPER</h1>
        <div v-for="item in paperList" :key="item.Year" class="mt-6">
          <p>
            {{ item.Title }},{{ item.Role }},<span class="italic">
              {{ item.Journal }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <hr />
    <img src="../assets/Summary.jpg" alt="Summary" />
    <hr />

    <div style="border" float:right>
      Contact: <a href="mailto:arcane@skku.edu">arcane@skku.edu</a>
    </div>
    <div>
      <p>Paragraph</p>

      <div style="display: block">hello</div>
      <div style="display: block">hello</div>
      <div style="display: block">hello</div>
      <div style="display: inline-block">hello</div>
      <div style="display: inline-block">hello</div>
      <div style="display: inline-block">hello</div>
      <div style="display: inline-block">hello</div>
      <div style="display: block">hello</div>
      <div style="display: inline; height: 100px">ABCDE</div>
      <div style="display: inline; height: 100px">ABCDE</div>
      <div style="display: inline; height: 100px">ABCDE</div>
      <div style="display: inline-block; height: 100px">ABCDE</div>
      <div style="display: inline-block; height: 100px">ABCDE</div>
      <div style="display: inline-block; height: 100px">ABCDE</div>

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

        <input
          checked="checked"
          name="newsletter"
          type="radio"
          value="daily"
        />Daily <input name="newsletter" type="radio" value="weekly" /> Weekly

        <br />
        <textarea cols="20" name="comments" rows="5">Comment</textarea><br />
        <label for="terms"> Accept terms </label>
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
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";

export default {
  name: "Practice",
  components: {},
  setup(props, ctx) {
    onMounted(() => {
      // 어려운 숫자 추가를 하는 부분
      const buttonDom = document.getElementById("add-number");
      const numberDom = document.getElementById("number");
      if (!buttonDom || !numberDom) return;
      buttonDom.addEventListener("click", (ev) => {
        let number = parseInt(numberDom.childNodes[0]?.nodeValue ?? "0", 10);
        if (Number.isNaN(number)) return;
        number += 1;
        numberDom.childNodes[0].nodeValue = `${number}`;
      });
    });
    return {
      test: 1,
      easyNumber: ref(0),
      honorsAndPrize: [
        {
          year: "2021-2024",
          content:
            'Creativity•Challenge Research Granted by NRF "The social Determinants of Health for Breast Cancer Survivor through Spatial Modeling in Geograhical Information System "',
        },
        {
          year: "2015-2018",
          content:
            'Global PhD Fellowship Granted by NRF "Development of Algorithm for minimizing cost of drug combination with same therapeutic effect." ',
        },
        {
          year: "2013",
          content:
            'Gold Prize, Severance QI Conference "Diabetes patient management system" ',
        },
        {
          year: "2010",
          content:
            'Bronze Prize, Severance QI Conference "Chemotherapy Assistant Program — outcome evaluation" ',
        },
        {
          year: " ",
          content:
            'Poster Presentation "Smart View - enhancing continuity of care"',
        },
        {
          year: "2008",
          content:
            'Grand Prize, Severance Infection Control Contest Short movie clip - "Angel`s Hammer" ',
        },
        {
          year: "2006",
          content:
            'Silver Prize, Severance Infection Control Contest "The Outcome of Infection Control in NICU" ',
        },
        {
          year: "2004",
          content:
            'Silver Prize, Severance Infection Control Contest "The Outcome of Infection Control in NICU" ',
        },
      ],
      paperList: [
        {
          Title:
            "Towards systematic integration of CPIC® guieline into clinical practice: modular implementation of PGx CDS",
          Role: "1st Author",
          Journal: "(under review)",
          Year: "",
        },
        {
          Title:
            "clinical Genome Data Model (cGDM) provides interactive clinical Decision Support for precision Medicine",
          Role: "1st Author",
          Journal: "Scientific Reports",
          Year: "(2020)",
        },
        {
          Title:
            "Extracting Structured Genotype Information from Free-Text HLA Reports Using a Rule-Based Approach",
          Role: "2nd Author",
          Journal: "JKMS",
          Year: "(2020)",
        },
        {
          Title:
            "Assessment of efficiency and safety of the comprehensive CAP for ordering oncology medications",
          Role: "2nd Author",
          Journal: "IJMI",
          Year: "(2013)",
        },
      ],
    };
  },
  methods: {
    none() {
      console.log("none");
    },
    addEasyNumber() {
      this.easyNumber += 1;
    },
  },
};
</script>

<style>
.test {
  text-decoration: underline;
}
</style>
