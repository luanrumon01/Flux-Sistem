import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { action, lead, allLeads } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "A chave API do Gemini (GEMINI_API_KEY) não está configurada nos segredos." },
        { status: 500 }
      );
    }

    if (action === "generate-pitch") {
      const prompt = `Você é o Flux AI, um assistente inteligente integrado ao painel Flux CRM. 
Gere um rascunho de e-mail de vendas / proposta comercial altamente persuasivo, profissional e personalizado em português para o seguinte lead:
- Empresa: ${lead.company}
- Contato: ${lead.contact}
- Valor do Negócio: R$ ${lead.value.toLocaleString("pt-BR")}
- Estágio de Vendas: ${lead.stage}
- Urgência/Prioridade: ${lead.urgency || "Normal"}
- Notas/Histórico: ${lead.notes || "Nenhum histórico específico registrado."}

Escreva em um tom amigável, direto, focado na dor do cliente e propondo valor real. O e-mail deve ter um Assunto atraente e uma assinatura profissional. Mantenha a resposta limpa em formatação Markdown.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      return NextResponse.json({ text: response.text });
    }

    if (action === "lead-insights") {
      const prompt = `Você é o Flux AI, consultor estratégico especialista em vendas para o Flux CRM. 
Analise os dados deste lead de vendas e sugira 3 ações imediatas concretas (Próximos Passos) para acelerar o fechamento de contrato:
- Empresa: ${lead.company}
- Contato: ${lead.contact}
- Valor: R$ ${lead.value.toLocaleString("pt-BR")}
- Estágio atual: ${lead.stage}
- Urgência/Prioridade: ${lead.urgency || "Normal"}
- Notas: ${lead.notes || "Sem observações adicionais."}

Forneça sua resposta em português formatada em Markdown com bullet points objetivos e práticos. Fale diretamente para o vendedor.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      return NextResponse.json({ text: response.text });
    }

    if (action === "dashboard-chat") {
      const leadsListSummary = allLeads
        ? allLeads
            .map(
              (l: any, i: number) =>
                `${i + 1}. ${l.company} (${l.contact}) - R$ ${l.value.toLocaleString("pt-BR")} no estágio [${l.stage}] - Urgência: ${l.urgency || "Normal"}`
            )
            .join("\n")
        : "Nenhum lead registrado no momento.";

      const prompt = `Você é o Flux AI, o assistente inteligente residente integrado ao Flux CRM.
O usuário está visualizando o painel geral de controle do CRM. Aqui está o resumo atual dos leads ativos sob gestão:
${leadsListSummary}

Responda à seguinte mensagem do usuário (luan.rumon@gmail.com ou vendedor associado) sobre como otimizar o funil de vendas, priorizar contatos ou conselhos práticos gerais para fechar mais negócios neste mês.
Mensagem do Usuário: "${lead}"

Mantenha a resposta concisa, motivadora, em português brasileiro, e formatada lindamente em Markdown.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      return NextResponse.json({ text: response.text });
    }

    return NextResponse.json({ error: "Ação não suportada" }, { status: 400 });
  } catch (error: any) {
    console.error("Erro na API da Gemini:", error);
    return NextResponse.json(
      { error: error?.message || "Ocorreu um erro ao processar sua solicitação de IA." },
      { status: 500 }
    );
  }
}
