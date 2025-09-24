import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface SlideData {
  id: string
  title: string
  icon: string
  content: JSX.Element
  color: string
}

function Index() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [checkedSymptoms, setCheckedSymptoms] = useState<string[]>([])

  const symptoms = [
    'Постоянная усталость',
    'Снижение мотивации',
    'Раздражительность',
    'Проблемы со сном',
    'Головные боли',
    'Снижение продуктивности',
    'Цинизм по отношению к работе',
    'Чувство бессмысленности'
  ]

  const toggleSymptom = (symptom: string) => {
    setCheckedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const slides: SlideData[] = [
    {
      id: 'intro',
      title: 'Что такое профессиональное выгорание?',
      icon: 'Brain',
      color: 'bg-gradient-to-br from-orange-400 to-orange-600',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-orange-400 to-teal-400 rounded-full flex items-center justify-center animate-scale-in">
              <Icon name="Brain" size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Профессиональное выгорание</h2>
          </div>
          
          <Card className="bg-white/80 backdrop-blur-sm animate-fade-in">
            <CardContent className="p-6">
              <p className="text-lg text-gray-700 mb-4">
                Профессиональное выгорание — это состояние физического, эмоционального и умственного истощения, 
                вызванное длительным воздействием стрессовых рабочих ситуаций.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Icon name="Zap" size={32} className="mx-auto mb-2 text-orange-500" />
                  <h4 className="font-semibold text-gray-800">Истощение</h4>
                  <p className="text-sm text-gray-600">Физическое и эмоциональное</p>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <Icon name="UserMinus" size={32} className="mx-auto mb-2 text-teal-500" />
                  <h4 className="font-semibold text-gray-800">Отчуждение</h4>
                  <p className="text-sm text-gray-600">От работы и коллег</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Icon name="TrendingDown" size={32} className="mx-auto mb-2 text-blue-500" />
                  <h4 className="font-semibold text-gray-800">Снижение</h4>
                  <p className="text-sm text-gray-600">Эффективности работы</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'symptoms',
      title: 'Симптомы и признаки',
      icon: 'AlertTriangle',
      color: 'bg-gradient-to-br from-red-400 to-orange-500',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Проверьте свои симптомы</h2>
            <p className="text-lg text-gray-600">Отметьте симптомы, которые вы испытываете</p>
          </div>
          
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                {symptoms.map((symptom, index) => (
                  <div 
                    key={symptom}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 animate-slide-up ${
                      checkedSymptoms.includes(symptom)
                        ? 'bg-red-50 border-red-300 text-red-800'
                        : 'bg-gray-50 border-gray-200 hover:border-red-200'
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => toggleSymptom(symptom)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        checkedSymptoms.includes(symptom)
                          ? 'bg-red-500 border-red-500'
                          : 'border-gray-300'
                      }`}>
                        {checkedSymptoms.includes(symptom) && (
                          <Icon name="Check" size={12} className="text-white" />
                        )}
                      </div>
                      <span className="font-medium">{symptom}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {checkedSymptoms.length > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg animate-fade-in">
                  <div className="flex items-center mb-2">
                    <Icon name="Activity" size={20} className="text-red-500 mr-2" />
                    <span className="font-semibold">Результат оценки:</span>
                  </div>
                  <Progress value={(checkedSymptoms.length / symptoms.length) * 100} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    Выбрано симптомов: {checkedSymptoms.length} из {symptoms.length}
                  </p>
                  {checkedSymptoms.length >= 5 && (
                    <div className="mt-3 p-3 bg-red-100 rounded border border-red-200">
                      <p className="text-red-800 font-medium">⚠️ Высокий риск выгорания. Рекомендуется обратиться к специалисту.</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'causes',
      title: 'Причины возникновения',
      icon: 'Search',
      color: 'bg-gradient-to-br from-blue-400 to-teal-500',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Основные причины выгорания</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="workload" className="animate-fade-in">
              <AccordionTrigger className="text-left">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={24} className="text-blue-500" />
                  <span>Чрезмерная рабочая нагрузка</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pl-10">
                  <p className="text-gray-700 mb-3">Постоянная работа сверх нормы, невозможность отдохнуть</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Сверхурочные работы</li>
                    <li>Нереальные дедлайны</li>
                    <li>Многозадачность</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="control" className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center space-x-3">
                  <Icon name="Shield" size={24} className="text-teal-500" />
                  <span>Отсутствие контроля</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pl-10">
                  <p className="text-gray-700 mb-3">Невозможность влиять на рабочие процессы и решения</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Микроменеджмент</li>
                    <li>Отсутствие автономии</li>
                    <li>Игнорирование мнения сотрудника</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="recognition" className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center space-x-3">
                  <Icon name="Award" size={24} className="text-orange-500" />
                  <span>Недостаток признания</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 pl-10">
                  <p className="text-gray-700 mb-3">Отсутствие обратной связи и оценки достижений</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                    <li>Игнорирование успехов</li>
                    <li>Недостаточная оплата труда</li>
                    <li>Отсутствие карьерного роста</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )
    },
    {
      id: 'solutions',
      title: 'Способы борьбы',
      icon: 'Heart',
      color: 'bg-gradient-to-br from-green-400 to-teal-500',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Пути восстановления</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-teal-50 border-green-200 hover:shadow-lg transition-all duration-300 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="User" size={24} className="text-green-600" />
                  <span>Личные стратегии</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle2" size={16} className="text-green-500 mt-1" />
                    <span>Установление границ работы и отдыха</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle2" size={16} className="text-green-500 mt-1" />
                    <span>Практика медитации и релаксации</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle2" size={16} className="text-green-500 mt-1" />
                    <span>Физические упражнения и спорт</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle2" size={16} className="text-green-500 mt-1" />
                    <span>Хобби и творческая деятельность</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:shadow-lg transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Users" size={24} className="text-blue-600" />
                  <span>Профессиональная помощь</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle2" size={16} className="text-blue-500 mt-1" />
                    <span>Консультации с психологом</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle2" size={16} className="text-blue-500 mt-1" />
                    <span>Коучинг и наставничество</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle2" size={16} className="text-blue-500 mt-1" />
                    <span>Смена рабочей среды</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Icon name="CheckCircle2" size={16} className="text-blue-500 mt-1" />
                    <span>Отпуск и длительный отдых</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Lightbulb" size={24} className="text-yellow-600" />
                <h3 className="text-xl font-semibold text-gray-800">Помните</h3>
              </div>
              <p className="text-gray-700">
                Восстановление от выгорания — это процесс, который требует времени и терпения. 
                Не стесняйтесь обращаться за помощью к специалистам.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 'prevention',
      title: 'Профилактика',
      icon: 'Shield',
      color: 'bg-gradient-to-br from-purple-400 to-blue-500',
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Как предотвратить выгорание</h2>
          </div>
          
          <div className="grid gap-6">
            {[
              { icon: 'Target', title: 'Ставьте реальные цели', desc: 'Не перегружайте себя нереальными ожиданиями' },
              { icon: 'Clock3', title: 'Соблюдайте work-life balance', desc: 'Четко разделяйте время работы и отдыха' },
              { icon: 'MessageCircle', title: 'Развивайте коммуникацию', desc: 'Открыто обсуждайте проблемы с руководством' },
              { icon: 'Smile', title: 'Заботьтесь о себе', desc: 'Регулярно проверяйте свое эмоциональное состояние' }
            ].map((item, index) => (
              <Card 
                key={item.title} 
                className="hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-lg">
                      <Icon name={item.icon as any} size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'conclusion',
      title: 'Заключение',
      icon: 'Star',
      color: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-scale-in">
              <Icon name="Star" size={48} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ключевые выводы</h2>
          </div>
          
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Badge variant="secondary" className="bg-yellow-200 text-yellow-800">
                      Важно помнить
                    </Badge>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={16} className="text-yellow-600 mt-1" />
                        <span>Выгорание — это серьезное состояние</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={16} className="text-yellow-600 mt-1" />
                        <span>Профилактика лучше лечения</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={16} className="text-yellow-600 mt-1" />
                        <span>Помощь доступна всегда</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <Badge variant="secondary" className="bg-orange-200 text-orange-800">
                      Действия
                    </Badge>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={16} className="text-orange-600 mt-1" />
                        <span>Регулярно оценивайте свое состояние</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={16} className="text-orange-600 mt-1" />
                        <span>Не откладывайте решение проблем</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={16} className="text-orange-600 mt-1" />
                        <span>Обращайтесь за поддержкой</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center pt-6 border-t border-yellow-200">
                  <p className="text-lg font-medium text-gray-800">
                    Берегите себя и своё психическое здоровье! 💚
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Профессиональное выгорание</h1>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-gray-500" />
              <span className="text-sm text-gray-500">Интерактивная презентация</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Содержание</CardTitle>
                <CardDescription>Нажмите на раздел для перехода</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {slides.map((slide, index) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                        currentSlide === index 
                          ? 'bg-blue-50 border-l-4 border-blue-500 text-blue-700' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={slide.icon as any} size={18} />
                        <span className="text-sm font-medium">{slide.title}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Progress Bar */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Прогресс</span>
                    <span className="text-sm text-gray-600">
                      {currentSlide + 1} из {slides.length}
                    </span>
                  </div>
                  <Progress value={((currentSlide + 1) / slides.length) * 100} />
                </CardContent>
              </Card>

              {/* Current Slide */}
              <div className="animate-fade-in" key={currentSlide}>
                {slides[currentSlide].content}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="flex items-center space-x-2"
                >
                  <Icon name="ChevronLeft" size={16} />
                  <span>Назад</span>
                </Button>
                
                <Button
                  onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                  disabled={currentSlide === slides.length - 1}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                >
                  <span>Далее</span>
                  <Icon name="ChevronRight" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index