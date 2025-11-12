import { useState } from "react";
import { Header } from "@/components/Header";
import { AuthDialog } from "@/components/AuthDialog";
import { CadastralInput } from "@/components/CadastralInput";
import { MapView } from "@/components/MapView";
import { CoordinatesPanel } from "@/components/CoordinatesPanel";
import { HistoryPanel } from "@/components/HistoryPanel";
import { PricingDialog } from "@/components/PricingDialog";
import { InstructionsSection } from "@/components/InstructionsSection";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface HistoryItem {
  id: string;
  cadastralNumber: string;
  date: Date;
  coordinates: number[][];
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [pricingDialogOpen, setPricingDialogOpen] = useState(false);
  const [remainingParcels, setRemainingParcels] = useState(1); // 1 бесплатный участок без регистрации
  const [paidParcels, setPaidParcels] = useState(0); // Участки после покупки (только для авторизованных)
  const [loading, setLoading] = useState(false);
  const [currentCoordinates, setCurrentCoordinates] = useState<number[][] | null>(null);
  const [currentCadastralNumber, setCurrentCadastralNumber] = useState<string | null>(null);
  const [selectedContour, setSelectedContour] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [usedFreeParcel, setUsedFreeParcel] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    // При регистрации остается доступ ко всем участкам
  };

  const handleSearch = async (cadastralNumber: string) => {
    // Проверка доступных участков
    const totalAvailable = remainingParcels + paidParcels;
    
    if (totalAvailable <= 0) {
      if (!isAuthenticated) {
        // Если не авторизован и использовал бесплатный - требуется регистрация
        toast.error("Вы использовали бесплатный участок. Зарегистрируйтесь для покупки дополнительных участков");
        setAuthDialogOpen(true);
      } else {
        // Если авторизован - требуется покупка
        toast.error("У вас закончились доступные участки");
        setPricingDialogOpen(true);
      }
      return;
    }

    setLoading(true);

    // Симуляция загрузки данных
    setTimeout(() => {
      // Пример координат для демонстрации
      const mockCoordinates = [
        [37.6173, 55.7558],
        [37.6273, 55.7558],
        [37.6273, 55.7658],
        [37.6173, 55.7658],
        [37.6173, 55.7558],
      ];

      setCurrentCoordinates(mockCoordinates);
      setCurrentCadastralNumber(cadastralNumber);

      // Списываем участок: сначала бесплатный, потом платные
      if (remainingParcels > 0) {
        setRemainingParcels(remainingParcels - 1);
        setUsedFreeParcel(true);
      } else if (paidParcels > 0) {
        setPaidParcels(paidParcels - 1);
      }

      // Добавляем в историю
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        cadastralNumber,
        date: new Date(),
        coordinates: mockCoordinates,
      };
      setHistory(prev => [newHistoryItem, ...prev]);

      setLoading(false);
      toast.success("Участок найден и отображен на карте");
    }, 1500);
  };

  const handlePurchase = (parcels: number) => {
    setPaidParcels(prev => prev + parcels);
  };

  const handleHistoryItemSelect = (item: HistoryItem) => {
    setCurrentCoordinates(item.coordinates);
    setCurrentCadastralNumber(item.cadastralNumber);
    toast.info("Участок загружен из истории");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        remainingParcels={remainingParcels}
        paidParcels={paidParcels}
        onAuthClick={() => setAuthDialogOpen(true)}
        isAuthenticated={isAuthenticated}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Описание сервиса */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              ПолеКлик — сервис координат для ЕФГИС ЗСН
            </h1>
            <p className="text-lg text-muted-foreground">
              Помогает бухгалтерам и сотрудникам сельхозпредприятий быстро получить координаты 
              участка по кадастровому номеру и вставить их в ЕФГИС ЗСН
            </p>
            <p className="text-base text-muted-foreground">
              Сервис сфокусирован на одном сценарии: «ввёл номер → увидел участок → скопировал координаты»
            </p>
          </div>
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <CadastralInput onSearch={handleSearch} loading={loading} />
            <MapView coordinates={currentCoordinates} selectedContour={selectedContour} />
          </div>

          <div className="space-y-6">
            <CoordinatesPanel
              coordinates={currentCoordinates}
              cadastralNumber={currentCadastralNumber}
            />
            
            {isAuthenticated && (
              <Button
                onClick={() => setPricingDialogOpen(true)}
                variant="outline"
                className="w-full"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Купить пакет участков
              </Button>
            )}

            {isAuthenticated && <HistoryPanel history={history} onSelectItem={handleHistoryItemSelect} />}
          </div>
        </div>

        {/* Инструкции */}
        <div className="max-w-4xl mx-auto">
          <InstructionsSection />
        </div>
      </main>

      <AuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onAuthSuccess={handleAuthSuccess}
        showFreeParcelUsedMessage={usedFreeParcel && !isAuthenticated}
      />

      <PricingDialog
        open={pricingDialogOpen}
        onOpenChange={setPricingDialogOpen}
        onPurchase={handlePurchase}
      />
    </div>
  );
};

export default Index;
