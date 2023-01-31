<template>
  <div>
    <!-- list blog -->
    <section class="mt-5 mb-7 px-5">
      <v-container>
        <div  class="body-1 mb-2 color-head font-weight-bold">Blog</div>
        <v-row justify="center" v-show="process.run">
          <v-col  v-for="(p, run) in 5" :key="run" cols="3" class="py-0">
            <v-skeleton-loader
              type="image"
              :loading="process.run">
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-show="!process.run">
          <v-col cols="12">
            <v-card style="border-radius: 10px" class="box-shadow pa-3 mb-10"  v-for="(item, index) in list_blog" :key="index">
              <v-card-title class="title mb-3 text-cut">{{item.title}}</v-card-title>
              <v-card-text class="text-cut-desc">
                {{ item.description }}
              </v-card-text>
              <v-card-actions class="text-center">
                <v-btn
                  color="black"
                  class="white--text"
                  block>
                  Read more
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>   
    </section>
    <!-- end list blog -->
  </div>
</template>

<script>
export default {
 data() {
    return {
      list_blog: [
        {
          id: 15922,
          user_id: 203852,
          title: "Conduco auxilium rerum urbanus auris communis amor",
          description: "Candidus umbra patrocinor. Culpa desino repellendus. Harum voluptas tres. Crustulum dolorem collum. Cuppedia capio decipio. Tristis caries avarus. Tui bellum abscido. Aperiam deleniti omnis. Depraedor aedificium communis. Autem turbo denuo. Coruscus aperiam tui. Sono adeo quas. Territo teres voluptatem. Qui vociferor clam. Minima audentia teneo. Reiciendis venia anser. Via conicio conturbo. Depraedor reiciendis tubineus.",
        },
        {
          id: 15913,
          user_id: 203634,
          title: "CVorax supellex thema tui tabgo aeneus sufficio cui commodo tricesimus et laborum ventosus agnitio.",
          description: "Tantillus curto defungo. Adamo utrum adiuvo. Amissio vesper pax. Uxor cervus artificiose. Statua vulgivagus advoco. Quam tabgo esse. Decumbo quaerat triumphus. Tepidus vociferor clibanus. Curia turba atque. Arx strenuus fugiat. Spiculum sit solio. Distinctio calculus adiuvo. Blandior concedo aequus. Taedium supra curriculum. Armo casso valens. Laborum facilis acervus. Tepidus consequatur tibi. Terror occaecati altus. Solutio natus cedo. Caecus cubicularis qui.",
        },
        {
          id: 15912,
          user_id: 203626,
          title: "Depono quo quam asporto sophismata verto alienus ustilo maxime vado collum suffragium.",
          description: "Ait amet cum. Chirographum dolore tepidus. Solutio et amo. Tero adflicto adipisci. Attero viriliter vinculum. Blanditiis stultus qui. Torqueo arguo cum. Caelestis ullam ut. Tener cometes corrupti. Quia cui neque. Vulariter abutor concido. Et thalassinus conduco. Utroque demens valeo. Cetera avoco cibo. Valens claudeo calco. Aestivus magni pax. Qui delectatio cultura. Omnis adnuo dignissimos. Demo conservo voluptatem. Theca quidem cornu. Auditor templum autem. Demum conatus somniculosus.",
        },
        {
          id: 15911,
          user_id: 203620,
          title: "Trucido caste vesper tremo aeneus dolor unde conventus venia ara.",
          description: "Nam terra compello. Crur coaegresco commodi. Tubineus et credo. Vapulus tot defluo. Vero acceptus patior. Asporto audentia depopulo. Sed vergo attollo. Pecto beatae ipsam. Suspendo triduana claro. Patria basium amo. Deficio arceo vomito. Cunabula et tergo. Charisma temptatio ea. Titulus appono tollo. Autem caput atavus. Sunt degenero corrupti. Deputo et qui.",
        },
        {
          id: 15910,
          user_id: 203619,
          title: "Vestrum carpo qui acerbitas calamitas coaegresco patrocinor abutor ut stultus defluo votum uredo vergo trado unde.",
          description: "Debitis audeo auctor. Aeger taceo admiratio. Speciosus accusator curto. Altus abduco voluptatem. Cupressus torqueo contigo. Templum coma vado. Vestrum audentia succurro. Textilis adeptio tracto. Clamo cubo tactus. Theca cognomen rerum. In approbo cubo. Crudelis tabgo tui. Bene adinventitias deficio. Decens agnitio velociter. Adhuc sollers culpo.",
        },
      ],
      selected: {
        banner: 0
      },
      process: {
        run: false
      },
    }
  },
  components: {},
  watch: {},
  computed: {},
  mounted () {},
  methods: {

  }
}
</script>

<style scoped>  

</style>