export interface JavaTemplate {
  id: string;
  title: string;
  fileName: string;
  description: string;
  code: string;
}

export const JAVA_TEMPLATES: JavaTemplate[] = [
  {
    id: 'standard',
    title: 'Standart Ödev Kodu (Önerilen)',
    fileName: 'NotOrtalamasi.java',
    description: 'Java 101 ödev isterlerine birebir uygun, Scanner ve Ternary Operator kullanan temiz kod.',
    code: `import java.util.Scanner;

/**
 * ============================================================================
 * Proje      : Not Ortalaması Hesaplayan Program
 * Geliştirici: Enes Öztürk
 * Ders       : Java 101 (Temel Kavramlar ve Değişkenler)
 * Ödev Tanımı: Matematik, Fizik, Kimya, Türkçe, Tarih, Müzik sınav puanlarını
 *              alıp ortalamayı hesaplar ve Ternary Operator ile sınıf geçme
 *              durumunu ekrana yazdırır.
 * ============================================================================
 */
public class NotOrtalamasi {

    public static void main(String[] args) {
        // Scanner nesnesi oluşturuluyor
        Scanner scanner = new Scanner(System.in);

        // Derslerin not değişkenleri tanımlanıyor
        int mat, fizik, kimya, turkce, tarih, muzik;

        System.out.println("==================================================");
        System.out.println("   NOT ORTALAMASI VE SINIF GEÇME HESAPLAMA        ");
        System.out.println("   Geliştirici: Enes Öztürk                      ");
        System.out.println("==================================================");

        // Kullanıcıdan ders notlarının alınması
        System.out.print("Matematik Notunuz : ");
        mat = scanner.nextInt();

        System.out.print("Fizik Notunuz     : ");
        fizik = scanner.nextInt();

        System.out.print("Kimya Notunuz     : ");
        kimya = scanner.nextInt();

        System.out.print("Türkçe Notunuz    : ");
        turkce = scanner.nextInt();

        System.out.print("Tarih Notunuz     : ");
        tarih = scanner.nextInt();

        System.out.print("Müzik Notunuz     : ");
        muzik = scanner.nextInt();

        // Notların toplamı ve ortalamasının hesaplanması
        double toplam = mat + fizik + kimya + turkce + tarih + muzik;
        double ortalama = toplam / 6.0;

        // Ödev Koşulu: Ternary Operator (Üçlü Operatör) ile Geçti / Kaldı kontrolü
        // Kullanıcının ortalaması 60'tan büyük ise "Sınıfı Geçti", küçük ise "Sınıfta Kaldı"
        String sonuc = (ortalama > 60) ? "Sınıfı Geçti" : "Sınıfta Kaldı";

        // Sonuçların ekrana yazdırılması
        System.out.println("--------------------------------------------------");
        System.out.printf("Ders Sayısı        : 6\\n");
        System.out.printf("Toplam Puan        : %.2f\\n", toplam);
        System.out.printf("Genel Not Ortalaması: %.2f\\n", ortalama);
        System.out.println("Durum              : " + sonuc);
        System.out.println("--------------------------------------------------");
        System.out.println("Ödev Hazırlayan    : Enes Öztürk");
        System.out.println("==================================================");

        // Kaynak sızıntısını önlemek için scanner kapatılır
        scanner.close();
    }
}
`,
  },
  {
    id: 'interactive_loop',
    title: 'Gelişmiş & Giriş Kontrollü Sürüm',
    fileName: 'NotOrtalamasiGelismi.java',
    description: '0-100 arası geçerlilik kontrolü, dizi (array) yapısı ve Try-With-Resources ile profesyonel mimari.',
    code: `import java.util.Scanner;

/**
 * ============================================================================
 * Proje      : Gelişmiş Not Ortalaması Hesaplayıcı
 * Geliştirici: Enes Öztürk
 * Özellikler : Dizi döngüsü, 0-100 aralık doğrulama ve Ternary Operator
 * ============================================================================
 */
public class NotOrtalamasiGelismi {

    public static void main(String[] args) {
        String[] dersler = {"Matematik", "Fizik", "Kimya", "Türkçe", "Tarih", "Müzik"};
        double[] notlar = new double[dersler.length];
        double toplam = 0.0;

        System.out.println("==================================================");
        System.out.println("   GELİŞMİŞ NOT VE GEÇME SİSTEMİ | ENES ÖZTÜRK    ");
        System.out.println("==================================================");

        try (Scanner scanner = new Scanner(System.in)) {
            for (int i = 0; i < dersler.length; i++) {
                boolean gecerliNot = false;
                while (!gecerliNot) {
                    System.out.printf("%-12s Notunu Giriniz (0 - 100): ", dersler[i]);
                    if (scanner.hasNextDouble()) {
                        double notDegeri = scanner.nextDouble();
                        if (notDegeri >= 0 && notDegeri <= 100) {
                            notlar[i] = notDegeri;
                            toplam += notDegeri;
                            gecerliNot = true;
                        } else {
                            System.out.println(">> HATA: Not 0 ile 100 arasında olmalıdır!");
                        }
                    } else {
                        System.out.println(">> HATA: Lütfen sayısal bir değer giriniz!");
                        scanner.next(); // Hatalı girdiyi temizle
                    }
                }
            }

            double ortalama = toplam / dersler.length;

            // Ternary Operator kullanarak sınıfı geçme durumunun belirlenmesi
            String durum = (ortalama > 60.0) ? "Sınıfı Geçti" : "Sınıfta Kaldı";
            String takdirDurumu = (ortalama >= 85.0) ? "Takdir Belgesi Hak Kazandı" :
                                  (ortalama >= 70.0) ? "Teşekkür Belgesi Hak Kazandı" : "Onur Belgesi Yok";

            System.out.println("--------------------------------------------------");
            System.out.println(">> HESAPLAMA RAPORU");
            System.out.printf(">> Toplam Puan : %.2f\\n", toplam);
            System.out.printf(">> Ortalama    : %.2f\\n", ortalama);
            System.out.printf(">> Genel Sonuç : %s\\n", durum);
            System.out.printf(">> Başarı Belgesi: %s\\n", takdirDurumu);
            System.out.println("--------------------------------------------------");
            System.out.println(">> İmzalı Kod  : Enes Öztürk");
            System.out.println("==================================================");
        }
    }
}
`,
  },
  {
    id: 'comparison',
    title: 'Ternary vs if-else Karşılaştırması',
    fileName: 'TernaryKarsilastirma.java',
    description: 'Ödev şartı olan Ternary Operator ile geleneksel if-else bloklarının farkı.',
    code: `/**
 * Ternary Operator (Üçlü Operatör) ile if-else Karşılaştırması
 * Yazar: Enes Öztürk
 *
 * Sözdizimi:
 * degisken = (kosul) ? dogruysa_deger : yanlissa_deger;
 */
public class TernaryKarsilastirma {

    public static void main(String[] args) {
        double ortalama = 68.5;

        // 1. GELENEKSEL YÖNTEM (if-else) - 8 satır:
        String sonucIfElse;
        if (ortalama > 60) {
            sonucIfElse = "Sınıfı Geçti";
        } else {
            sonucIfElse = "Sınıfta Kaldı";
        }

        // 2. TERNARY OPERATOR (ÖDEV İSTERİ) - Tek satır, zarif ve temiz:
        String sonucTernary = (ortalama > 60) ? "Sınıfı Geçti" : "Sınıfta Kaldı";

        // İki yöntem de aynı sonucu üretir:
        System.out.println("if-else Sonucu: " + sonucIfElse);
        System.out.println("Ternary Sonucu: " + sonucTernary);
    }
}
`,
  },
];

export const CODE_EXPLANATIONS = [
  {
    step: '1. Scanner ile Veri Alma',
    code: 'Scanner scanner = new Scanner(System.in);',
    explanation: 'Java\'da kullanıcıdan klavye yoluyla girdi alabilmek için `java.util.Scanner` sınıfı dahil edilir ve bir nesne türetilir.',
  },
  {
    step: '2. Değişken Tanımları',
    code: 'int mat, fizik, kimya, turkce, tarih, muzik;',
    explanation: 'Ödevde istenen 6 dersin her biri için tam sayı veya ondalıklı değer tutacak değişkenler oluşturulur.',
  },
  {
    step: '3. Aritmetik Ortalama',
    code: 'double ortalama = toplam / 6.0;',
    explanation: 'Tamsayı bölme hatasından kaçınmak (integer division truncation) için bölen değer `6.0` (double) olarak yazılır; böylece küsuratlı doğru sonuç elde edilir.',
  },
  {
    step: '4. Ternary Operator (Ödev Şartı)',
    code: 'String sonuc = (ortalama > 60) ? "Sınıfı Geçti" : "Sınıfta Kaldı";',
    explanation: 'Soru işareti (?) öncesi `ortalama > 60` koşuludur. Eğer doğruysa `?` sonrasındaki `"Sınıfı Geçti"`, yanlışsa `:` sonrasındaki `"Sınıfta Kaldı"` seçilir.',
  },
];
