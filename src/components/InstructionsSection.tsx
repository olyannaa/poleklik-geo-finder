import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, Video } from "lucide-react";

export const InstructionsSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          <CardTitle>Инструкции</CardTitle>
        </div>
        <CardDescription>
          Как работать с сервисом ПолеКлик
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Как получить координаты участка?</AccordionTrigger>
            <AccordionContent className="space-y-3">
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Войдите в систему или зарегистрируйтесь (получите 1 бесплатный участок)</li>
                <li>Введите кадастровый номер в формате XX:XX:XXXXXX:XXXX</li>
                <li>Нажмите кнопку "Найти участок"</li>
                <li>Участок отобразится на карте</li>
                <li>Если участок многоконтурный, выберите нужный контур</li>
                <li>Нажмите "Скопировать для ЕФГИС ЗСН"</li>
                <li>Вставьте координаты в ЕФГИС ЗСН</li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Где взять кадастровый номер?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Кадастровый номер можно найти:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>В документах на земельный участок</li>
                <li>На сайте Росреестра (rosreestr.gov.ru)</li>
                <li>В выписке из ЕГРН</li>
                <li>На публичной кадастровой карте</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Как работает история участков?</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Все обработанные участки сохраняются в истории. Вы можете:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Просмотреть ранее найденные участки</li>
                <li>Повторно скопировать координаты бесплатно</li>
                <li>Кликнуть на запись для отображения участка на карте</li>
              </ul>
              <p className="font-semibold text-foreground mt-2">
                Важно: повторное копирование из истории не списывает доступные участки!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                <span>Видеоинструкция</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Видеоинструкция будет доступна в ближайшее время
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Формат координат для ЕФГИС ЗСН</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground space-y-2">
              <p>
                ПолеКлик автоматически форматирует координаты в правильный формат для ЕФГИС ЗСН:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Долгота и широта разделены пробелом</li>
                <li>Точки разделены запятыми</li>
                <li>Готово для прямой вставки в систему</li>
              </ul>
              <div className="bg-muted p-3 rounded-lg mt-2">
                <p className="text-xs font-mono">
                  Пример: 37.123456 55.654321, 37.234567 55.765432
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
